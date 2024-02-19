"use client";
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { getrdv } from '@/app/services';
import { css } from "@emotion/react";
import { BeatLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
`;

const RDVList = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [grossesse, setGrossesse] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getrdv();
        if (response) {
          setSuccessMessage('Connexion réussie !');
          setGrossesse(response);
        } else {
          setErrorMessage('Erreur lors de la connexion.');
        }
      } catch (error) {
        console.error(error);
        setErrorMessage('Erreur lors de la communication avec le serveur.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <BeatLoader css={override} size={15} color={"#4A90E2"} loading={true} />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center mt-20 text-3xl font-bold">Calendrier des rendez-vous</h1>
    <div className="flex flex-wrap justify-center mt-20">
          {grossesse && grossesse.map((rdv, index) => (
    <div className="p-4 max-w-sm"  key={index} >
        <div className="flex rounded-lg h-full dark:bg-gray-800 bg-white p-8 flex-col">
            <div className="flex items-center mb-3">
                <div
                    className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                    {/* <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg> */}
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path fill="currentColor" d="M6 1a1 1 0 0 0-2 0h2ZM4 4a1 1 0 0 0 2 0H4Zm7-3a1 1 0 1 0-2 0h2ZM9 4a1 1 0 1 0 2 0H9Zm7-3a1 1 0 1 0-2 0h2Zm-2 3a1 1 0 1 0 2 0h-2ZM1 6a1 1 0 0 0 0 2V6Zm18 2a1 1 0 1 0 0-2v2ZM5 11v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 11v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 15v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 15v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 11v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM5 15v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM2 4h16V2H2v2Zm16 0h2a2 2 0 0 0-2-2v2Zm0 0v14h2V4h-2Zm0 14v2a2 2 0 0 0 2-2h-2Zm0 0H2v2h16v-2ZM2 18H0a2 2 0 0 0 2 2v-2Zm0 0V4H0v14h2ZM2 4V2a2 2 0 0 0-2 2h2Zm2-3v3h2V1H4Zm5 0v3h2V1H9Zm5 0v3h2V1h-2ZM1 8h18V6H1v2Zm3 3v.01h2V11H4Zm1 1.01h.01v-2H5v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H5v2h.01v-2ZM9 11v.01h2V11H9Zm1 1.01h.01v-2H10v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM9 15v.01h2V15H9Zm1 1.01h.01v-2H10v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM14 15v.01h2V15h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM14 11v.01h2V11h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM4 15v.01h2V15H4Zm1 1.01h.01v-2H5v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H5v2h.01v-2Z"/>
                    </svg>

                </div>
                <h2 className="text-black dark:text-black text-lg font-medium">{rdv.message}</h2>
            </div>
             
            <div className="flex flex-col justify-between flex-grow">
                <p className="leading-relaxed text-base text-black dark:text-gray-300">
                {rdv.start} avec le {rdv.profession} {rdv.title} à {rdv.time}
                </p>
                <div className="flex justify-between">
                  <Link href="/rdv" className="transition duration-500 ease-in-out hover:bg-indigo-900 inline-block bg-green-600 text-lg font-medium rounded-full text-white px-4 py-2 cursor-pointer">
                  Modifier
                </Link>
                <Link href="/rdv" className="transition duration-500 ease-in-out hover:bg-indigo-900 inline-block bg-red-600 text-lg font-medium rounded-full text-white px-4 py-2 cursor-pointer">
                  Supprimer
                </Link>
              </div>
                <button type="button" className=" mt-5 transition duration-500 ease-in-out hover:bg-indigo-900 inline-block bg-blue-600 text-lg font-medium rounded-full text-white px-4 py-2 cursor-pointer">
                  Joindre un fichier
              </button>
            </div>
        </div>
        </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
        <Link href="/rdv" className="transition duration-500 ease-in-out hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-4 py-2 cursor-pointer">Ajouter un rendez-vous</Link>
       </div>
      <Modal isOpen={false}>
        <div id="popup" className="popup">
          <div className="popup-content">
            <form method="POST" id="formFile">
              <div className="mb-3">
                <label className="form-label">Titre pour les Résultats</label>
                <input type="text" className="form-control" id="title-examen" name="title" placeholder="Ok pour échographie" />
              </div>
              <div className="mb-3">
                <label className="form-label">Résultat Examen</label>
                <input className="form-control" type="file" name="file" id="formFile" required />
              </div>
              <button type="submit">Joindre</button>
              </form>
          </div>
        </div>
        
      </Modal>
    </div>
  );
};

export default RDVList;