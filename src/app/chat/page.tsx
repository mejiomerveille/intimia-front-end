"use client";
import React, { useState } from 'react';
import OpenAI from 'openai';
import { Send } from "react-feather";
import { content } from '@/components/utils/infoContent';
import Cookies from 'js-cookie';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function Chat() {
  // State variables
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleUserInput = async () => {
    // Start the loading state
    setIsLoading(true);

    // Add the user's message to the chat history
    setChatHistory((prevChat) => [
      ...prevChat,
      { role: 'user', content: userInput },
    ]);

    // Make a request to OpenAI for the chat completion
    
    const chatCompletion = await openai.chat.completions.create({
      messages: [
          {
              role: "assistant",
              name: "IntimBot",
              content: content
          },
          // {
          //     role: "user",
          //     content: 'comment calculer son cycle menstruelle?'
          // },
          ...chatHistory,
      ],
      model: 'gpt-3.5-turbo',
  });

    // Add the assistant's response to the chat history
    setChatHistory((prevChat) => [
      ...prevChat,
      {
        role: 'assistant',
        content: chatCompletion.choices[0].message.content,
      },
    ]);
    const token = localStorage.getItem('access_token');
    const csrftoken = Cookies.get('csrftoken');
    console.log(csrftoken)


    // Envoie de la conversation au backend
  await fetch('http://localhost:8000/api/v1/chatbot/save-conversation/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken, 
      'Accept': 'application/json',
      'Authorization' :`Bearer ${token}`
    },
    body: JSON.stringify({
      user_input: userInput,
      assistant_response: chatCompletion.choices[0].message.content,
    }),
  });

    // Clear the user input field and end the loading state
    setUserInput('');
    setIsLoading(false);
  };

  return (
    <div className='bg-grey-100 min-h-screen flex flex-col justify-center items-center mt-10'>
      <div className='w-full max-w-screen-md mg-white p-4 rounded-lg shadow-md bg-stone-100'>
        <div className='mb-4'>
          <div className='text-4xl font-bold text-blue-800 mb-2'>
            Intmia Chatbot 
          </div>
          <p className='text-gray-600 text-lg'>
            Welcome to the intimiaChatBot. Ask me anything about intimacy, pregnancy, menstruation, or any related topics!!!
          </p>
        </div>
        <div className='mb-4' style={{ height: '400px', overflow: 'auto' }}>
          {chatHistory.map((Message, index) => (
            <div
              key={index}
              className={`${
                Message.role === 'user' ? 'text-left' : 'text-right'
              } mb-2`}
            >
              <div
                className={`rounded-full p-2 max-w-md mx-4 inline-block ${
                  Message.role === 'user' ? 'bg-blue-800' : 'bg-white text-white'
                }`}
              >
                {Message.role === 'user' ? 'user' : 
                <img
                src="logo.jpeg"
                className="h-12 w-12 rounded-full"
              />}
              </div>
              <div
                className={`max-w-md mx-4 my-2 inline-block ${
                  Message.role === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-gray-800'
                } p-2 rounded-md`}
              >
                {Message.content}
              </div>
            </div>
          ))}
        </div>
        <div className='flex'>
          <input
            type="text"
            placeholder='Ask me something'
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className='flex-1 p-2 rounded-1-lg'
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleUserInput();
              }
            }}
          />
          {isLoading ? (
            <div className='bg-blue-500 text-white p-2 rounded-r-l animate-pulse'>
              Loading...
            </div>
          ) : (
            <button
              onClick={handleUserInput}
              className='bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600'
            >
              <Send />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}