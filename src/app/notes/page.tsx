"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/notes/get_notes/');
        setNotes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() === '' || content.trim() === '') {
      return; 
    }

    try {
      const response = await axios.post('http://localhost:8000/api/v1/notes/create/', {
        title,
        content,
        image,
      });
      const noteId = response.data.note_id;
      // Mettre à jour la liste des notes
      const updatedNotes = [...notes, { id: noteId, title, content ,image}];
      setNotes(updatedNotes);
      // Réinitialiser les champs de saisie
      setTitle('');
      setContent('');
      setImage('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-10">
      <h1 className="text-3xl font-bold mb-4">Notes</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre"
          className="border border-gray-300 rounded-md px-3 py-2 mr-2 focus:outline-none focus:border-blue-500"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Contenu"
          className="border border-gray-300 rounded-md px-3 py-2 mr-2 focus:outline-none focus:border-blue-500"
        />
         <input
         type="file" 
         value={image}
         onChange={(e) => setImage(e.target.value)}
         name="image" accept="image/*" />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Ajouter une note
        </button>
      </form>
      {notes.map((note) => (
        <div key={note.id} className="bg-gray-100 rounded-md p-4 mb-4">
          <h2 className="text-xl font-bold mb-2">{note.title}</h2>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
}