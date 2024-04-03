"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import { registernotes,getNotes,getGrossesse } from "@/app/services";
import moment from 'moment';
import Modal from 'react-modal';
import { CloseIcon } from "stream-chat-react";
import type { NextPage } from "next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { css } from "@emotion/react";
// import Cookies from 'js-cookie';

const override = css`
  display: block;
  margin: 0 auto;
`;
const schema = Yup.object().shape({
  grossesse:Yup.string().required('veuillez selectionner une grossesse!'),
  title: Yup.string().required('veuillez saisir le titre de la note'),
  content: Yup.string().required('veuillez saisir le contenu de votre Message'),
  image:Yup.string()
});


const Notes: NextPage = () => {
  const [notes, setNotes] = useState([]);
  const [grossesse, setGrossesse] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState("");
  
  const formik = useFormik({
    initialValues: {
      grossesse: "",
      title: "",
      content: "",
      image: "",
    },

    validationSchema: schema,
    // Handle form submission
    onSubmit: async ({ grossesse, title,content,image}) => {
      try {
        setIsLoading(true); 
        const response = await registernotes({ grossesse, title,content,image });
        if (response) {
          setSuccessMessage('enregistrement réussie !');
          window.location.reload();
        } else {
          setErrorMessage('Erreur lors de l enregistrement.');
        }
      } catch (error) {
        console.error(error);
        setErrorMessage('Erreur lors de la communication avec le serveur.');
      } finally {
        setIsLoading(false); 
      }
    },
  });
  const { errors, touched, values, handleChange, handleSubmit } = formik;

  const handleClick = () => {
      setModalOpen(true);
      
    };
  
  useEffect(() => {
    getNotes()
      .then(response => {
        setNotes(response);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des medecins:', error);
      });
  }, []);

  useEffect(() => {
    getGrossesse()
      .then(response => {
        setGrossesse(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des grossesses:', error);
      });
  }, []);
  let filteredNotes=[];
  if (notes) {
    filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }else{
     filteredNotes = [];
  }

  return (
    <div className='mt-24'>
        <div>
          <h1 className="text-2 xl font-bold mb-4">Notes</h1>
        </div>
        <div >
          <form className="max-w-md mx-auto">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                </div>
                <input type="search" id="default-search" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Rechercher des notes" required />
                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
              </div>
          </form>
        </div>
        <div className=' justify-center'>
              {/* {notes.map((note) => ( */}
          {filteredNotes.length > 0 ? (
            <>
                {filteredNotes.map((note) => (
          <div key={note.id}  className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl md:flex-row mt-4 mx-4">
            <div className="flex flex-col justify-start p-6">
              <h5 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">{note.title}</h5>
              <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">{note.content}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-300">{moment(note.created_at).format('DD MMM , YYYY')}</p>
            </div>
            <img style={{ width: "120px", height: "120px" }} className="h-96 w-full rounded-t-lg object-cover md:h-auto md:!rounded-none md:!rounded-l-lg"   src={`http://127.0.0.1:8000/${note.image}`}  alt="" />
          </div>
              ))}
              </>
              ) : (
                <p>No results found.</p>
              )}
        </div>
        <div className="flex justify-center mt-8">
        <button
          onClick={handleClick} className="transition duration-500 ease-in-out hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-4 py-2 cursor-pointer" >Ajouter une note
        </button>
       </div>
        <Modal isOpen={modalOpen}
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              zIndex: 1000,
            },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            maxHeight: '400px',
            overflowY: 'auto',
            },
          }}>
          <div>
            <form  onSubmit={handleSubmit}>
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold mb-4">Notes</h1>
              <button onClick={() => setModalOpen(false)}><CloseIcon /></button>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
            {/* <label for="pays">Grossesse correspondante:</label> */}
            <select
              onChange={handleChange}
              value={values.grossesse}
              id="grossesse"
             className="w-full border border-gray-300 p-2 mb-4 rounded" id="grossesse" name="grossesse" >
              <option value="grossesse">Grossesse correspondante:</option>
              {grossesse.map((g) => (
                <optgroup key={g.id} >
                <option  value={g.id}>{g.create_by_id__username+'-'+g.start_date}</option>
                </optgroup>
                ))}
            </select>
          {errors.grossesse && touched.grossesse && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.grossesse}</span>}

              <input
                type="text"
                id="title"
                value={values.title}
                onChange={handleChange}
                placeholder="Titre"
                className="w-full border border-gray-300 p-2 mb-4 rounded"/>
          {errors.title && touched.title && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.title}</span>}
              <textarea
                id="content"
                value={values.content}
                onChange={handleChange}
                placeholder="Contenu"
                className="w-full border border-gray-300 p-2 mb-4 rounded"/>
                {errors.content && touched.content && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.content}</span>}
              <input
                id="image"
                type="file" 
                value={values.image}
                onChange={handleChange}
                name="image" accept="image/*"
                className="w-full border border-gray-300 p-2 mb-4 rounded" />
                {errors.image && touched.image && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.image}</span>}
                {isLoading ? (
              <div className='bg-blue-500 text-white p-2 rounded-r-l animate-pulse'>
                Loading...
              </div>
                ) : (
              <button
                type='submit'
                
                className="bg-blue-500 text-white w-full py-2 rounded">Ajouter une note </button>
                    )}
                     
            </div>
            </form>
            {successMessage && <p className="bg-green-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{successMessage}</p>}
        {errorMessage && <p className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errorMessage}</p>}
          </div>
        </Modal>
    </div>
  );
};

export default Notes;