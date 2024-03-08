"use client";
import type { NextPage } from "next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerrdv } from '../../app/services';
import Modal from 'react-modal';
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { css } from "@emotion/react";
import { BeatLoader } from "react-spinners";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from "next/link";
import { CloseIcon } from "stream-chat-react";

  

const override = css`
  display: block;
  margin: 0 auto;
`;

// const messageRdv=(status:string,message:string,data:string)=>{
//     messageError:[{
//       status:"status",
//       message:"message",
//       data:"data",
//     }]

// }


// Yup schema to validate the form
const schema = Yup.object().shape({
  name: Yup.string().required(),
  profession: Yup.string().required(),
  email: Yup.string().required().email(),
  date: Yup.string().required(),
  time: Yup.string().required(),
  weight: Yup.string(),
  reminder: Yup.string(),
  notes: Yup.string(),

});

const RegisterRdvForm: NextPage = () =>{
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMedecinId, setSelectedMedecinId] = useState("");
  const [selectedMedecin, setSelectedMedecin] = useState("");
  const [medecins, setMedecins] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const handleClick = () => {
      setModalOpen(true);
      
    };
  

  // Formik hook to handle the form state
  const formik = useFormik({
    initialValues: {
      date: "",
      time: "",
      weight: "",
      reminder: "",
      notes: "",
    },

    // Pass the Yup schema to validate the form
    validationSchema: schema,

    onSubmit: async ({ date, time, weight,reminder,notes}) => {
      try {
        const response = await registerrdv({
          medecinId: selectedMedecinId,
          date,
          time,
          weight,
          reminder,
          notes,
        });
        setIsLoading(true); 
        if (response) {
          // messageRdv("success","Enregistrement réussie !",response)
          setSuccessMessage('Enregistrement réussie !');
          router.replace("rdv/rdv-list");
        } else {
          setErrorMessage('Erreur de l\'enregistrement.');
          // messageRdv("error","Erreur de l\'enregistrement!" ,"")

        }
      } catch (error) {
        console.error(error);
        // messageRdv("error","Erreur lors de la communication avec le serveur!" ,"")
        setErrorMessage('Erreur lors de la communication avec le serveur.');
      }finally {
        setIsLoading(false); // Désactiver le loader
        setSuccessMessage('');
        setErrorMessage('');
      }
    },
  });

  // Destructure the formik object
  const { errors, touched, values, handleChange, handleSubmit } = formik;
  
    
    useEffect(() => {
      const fetchMedecins = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/v1/rdv/medecins/');
          setMedecins(response.data);
          const currentUrl = router.asPath;
          const url = localStorage.setItem('URL1',currentUrl) ;
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchMedecins();
    }, []);

    const handleSelectMedecin = (medecin) => {
      setSelectedMedecinId(medecin.id);
      setSelectedMedecin(medecin.name);
      setModalOpen(false);
    };

    
  return (
    <div className="border-blue-400 mt-16">
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400 bg-gray-50">
        <h1 className="text-xl font-bold my-4">Enregistrer un rendez-vous medical</h1>
        {selectedMedecin?(
          // <label htmlFor="selectedMedecin">{selectedMedecin}</label>
          <input
             type="text"
             name="selectedMedecin"
             value={selectedMedecin}
             onChange={handleChange}
             id="selectedMedecin"
             onClick={handleClick}
             placeholder="selectedMedecin"
             />
                          ) : (
                              <>
                                  <button className="bg-green-600 text-white font-bold rounded-full cursor-pointer px-6 py-2 mb-4 " onClick={handleClick} >
                                    {isLoading ? (
                                      <BeatLoader color={"#ffffff"} loading={isLoading} css={override} size={10} />
                                    ) : (
                                      "Selectionner votre medecin"
                                    )}
                                    
                                    </button>
                              </>
                  )
        }
          <Modal isOpen={modalOpen}
          style={{
            // overlay: {
            //   backgroundColor: 'rgba(0, 0, 0, 0.6)',
            // },
            // content: {
            //   top: '50%',
            //   left: '50%',
            //   right: 'auto',
            //   bottom: 'auto',
            //   marginRight: '-50%',
            //   transform: 'translate(-50%, -50%)',
            // },
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
              // width: '400px',
              maxHeight: '400px',
              overflowY: 'auto',
            },
          }}>
        <div>
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold mb-4">Liste des médecins</h1>
            <button onClick={() => setModalOpen(false)}>
            <CloseIcon />
            </button>
          </div>
      <table className="border-collapse w-full">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nom</th>
            <th className="py-2 px-4 border-b">Profession</th>
            <th className="py-2 px-4 border-b">Téléphone</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Actions</th> 
          </tr>
        </thead>
        <tbody>
          {medecins.map((medecin) => (
            <tr key={medecin.id}>
              <td className="py-2 px-4 border-b">{medecin.name}</td>
              <td className="py-2 px-4 border-b">{medecin.profession}</td>
              <td className="py-2 px-4 border-b">{medecin.phone_number}</td>
              <td className="py-2 px-4 border-b">{medecin.email}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleSelectMedecin(medecin)}
                >
                  Sélectionner
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-8">
        <Link href="/medecin" className="transition duration-500 ease-in-out hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-4 py-2 cursor-pointer">Ajouter un medecin</Link>
       </div>
    </div>
  
      </Modal>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
             type="date"
             name="date"
             value={values.date}
             onChange={handleChange}
             id="date"
             placeholder="date"
             />
           {errors.date && touched.date && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.date}</span>}
          <input
             type="time"
             name="time"
             value={values.time}
             onChange={handleChange}
             id="time"
             placeholder="time"
             />
           {errors.time && touched.time && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.time}</span>}
           
          <input
             type="weight"
             name="weight"
             value={values.weight}
             onChange={handleChange}
             id="weight"
             placeholder="weight"
             />
           {errors.weight && touched.weight && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.weight}</span>}
          {/* <label htmlFor="note">note</label> */}
          <textarea
          className="b-black"
           name="notes"
           value={values.notes}
           onChange={handleChange}
           id="notes"
           placeholder="notes"
          
          />
          <div className="flex"> 
          <label htmlFor="Me rappeler">Me rappeler</label>
          <input className="flex"
            type="checkbox"
            name="reminder"
            value={values.reminder}
            onChange={handleChange}
            id="reminder"
            placeholder="reminder"
 
          />
          </div>
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
          {isLoading ? (
            <BeatLoader color={"#ffffff"} loading={isLoading} css={override} size={10} />
          ) : (
            "Enregistrer le rdv"
          )}
          </button>
        </form>
        {/* {messageError.map((message, index) => ()} */}
        {successMessage && <p className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{successMessage}</p>}
        {errorMessage && <p className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errorMessage}</p>}
      </div>
    </div>
    </div>
  );
}
export default RegisterRdvForm;
