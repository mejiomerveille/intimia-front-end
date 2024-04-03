"use client";
import { CloseIcon } from "stream-chat-react";
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { getrdv,deleterdv,updaterdv } from '@/app/services';
import { css } from "@emotion/react";
import { BeatLoader } from "react-spinners";

const override = css`
  display: block;+
  margin: 0 auto;
`;

const RDVList = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getrdv();
        if (response) {
          if(response.statut == 'error'){
            console.log(response.statut);
            setErrorMessage("Vous n'avez pas encore enregistré de rendez vous");
          }else if(response.message!=""){
            setIsLoading(true);
            setAppointments(response.data);
            console.log(response.data);
            setSuccessMessage('reccuperation réussie !');
          }
          else{
          setErrorMessage("Pas de rendez vous trouves");
          }
        } else {
          setErrorMessage('veuillez vous connecter pour consulter vos rendez-vous.');
        }
      } catch (error) {
        console.error(error);
        setErrorMessage('Erreur lors de la communication avec le serveur.');
      } finally {
        setIsLoading(false);
        setSuccessMessage('');
      }
    };

    fetchData();
  }, []);

  const modifier = async (id:number) => {
    const confirmed = window.confirm('Voulez-vous vraiment modifier ce rendez-vous?');
    if (confirmed) {
      try {
        const response = await updaterdv(id);
        if (response.ok) {
          setSuccessMessage("La modification du rendez-vous s'est effectuée avec succès");
        } else {
          setErrorMessage("La modification du rendez-vous a échoué");
        }
      } catch (error) {
        setErrorMessage(" Une erreur s'est produite lors de la modification du rendez-vous");
      }
    }
  };

  const handleClick = async (id:number) => {
    const confirmed = window.confirm('Voulez-vous vraiment supprimer ce rendez-vous?');
    if (confirmed) {
      try {
        const response = await deleterdv(id);
        if (response) {
          console.log(response.data)
          setSuccessMessage("La suppression du rendez-vous s'est effectuée avec succès");
          window.location.reload();
        } else {
          setErrorMessage("La suppression du rendez-vous a échoué");
          window.location.reload();
        }
      } catch (error) {
        setErrorMessage(" Une erreur s'est produite lors de la suppression du rendez-vous");
        window.location.reload();
      }
    //  finally {
    //   setSuccessMessage('');
    // }
    }
  };
  const handleClickM = () => {
    setModalOpen(true);
    
  };
 
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
    {errorMessage && (
        <div className="text-red-500 text-center mt-4">{errorMessage}</div>
      )}
       {successMessage && (
        <div className="text-green-500 text-center mt-4">{successMessage}</div>
      )}
              {appointments.map(appointment   => (
    <div className="p-4 max-w-sm"  key={appointment.id}>
        <div className="flex rounded-lg h-full dark:bg-gray-800 bg-white p-8 flex-col">
            <div className="flex items-center mb-3">
              
                <div
                    className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                    
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path fill="currentColor" d="M6 1a1 1 0 0 0-2 0h2ZM4 4a1 1 0 0 0 2 0H4Zm7-3a1 1 0 1 0-2 0h2ZM9 4a1 1 0 1 0 2 0H9Zm7-3a1 1 0 1 0-2 0h2Zm-2 3a1 1 0 1 0 2 0h-2ZM1 6a1 1 0 0 0 0 2V6Zm18 2a1 1 0 1 0 0-2v2ZM5 11v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 11v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 15v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 15v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 11v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM5 15v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM2 4h16V2H2v2Zm16 0h2a2 2 0 0 0-2-2v2Zm0 0v14h2V4h-2Zm0 14v2a2 2 0 0 0 2-2h-2Zm0 0H2v2h16v-2ZM2 18H0a2 2 0 0 0 2 2v-2Zm0 0V4H0v14h2ZM2 4V2a2 2 0 0 0-2 2h2Zm2-3v3h2V1H4Zm5 0v3h2V1H9Zm5 0v3h2V1h-2ZM1 8h18V6H1v2Zm3 3v.01h2V11H4Zm1 1.01h.01v-2H5v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H5v2h.01v-2ZM9 11v.01h2V11H9Zm1 1.01h.01v-2H10v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM9 15v.01h2V15H9Zm1 1.01h.01v-2H10v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM14 15v.01h2V15h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM14 11v.01h2V11h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM4 15v.01h2V15H4Zm1 1.01h.01v-2H5v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H5v2h.01v-2Z"/>
                    </svg>

                </div>
                <h2 className="text-black dark:text-black text-lg font-medium">Rendez vous prevus pour le {appointment.date}</h2>
            </div>
             
            <div className="flex flex-col justify-between flex-grow">
                <p className="leading-relaxed text-base text-black dark:text-gray-300">
                 avec le {appointment.doctor__name} a {appointment.time},{appointment.doctor__profession}
                </p>
                <div className="flex justify-between">
                  <button onClick={() => modifier(appointment.id)} className="transition duration-500 ease-in-out hover:bg-indigo-900 inline-block bg-green-600 text-lg font-medium rounded-full text-white px-4 py-2 cursor-pointer">
                  Modifier
                </button>
                <button onClick={() => handleClick(appointment.id)} className="transition duration-500 ease-in-out hover:bg-indigo-900 inline-block bg-red-600 text-lg font-medium rounded-full text-white px-4 py-2 cursor-pointer">
                  Supprimer
                </button>
              </div>
                <button onClick={handleClickM} className=" mt-5 transition duration-500 ease-in-out hover:bg-indigo-900 inline-block bg-blue-600 text-lg font-medium rounded-full text-white px-4 py-2 cursor-pointer">
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
          <div className="popup-content">
            <form method="POST" id="formFile">
            <div className="flex justify-between">
              <h1 className="font-bolt mb-4">Carnet/resultat examen</h1>
              <button onClick={() => setModalOpen(false)}><CloseIcon /></button>
            </div>
              <div className="mb-3">
                <label className="form-label">Titre pour les Résultats</label>
                <input type="text" className="form-control" id="title-examen" name="title" placeholder="Ok pour échographie" />
              </div>
              <div className="mb-3">
                <label className="form-label">Résultat Examen</label>
                <input className="form-control" type="file" name="file" id="formFile" required />
              </div>
              <button className="transition duration-500 ease-in-out hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-4 py-2 cursor-pointer" type="submit">Joindre</button>
              </form>
          </div>
        
      </Modal>
    </div>
  );
};

export default RDVList;