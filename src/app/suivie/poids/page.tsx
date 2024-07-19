"use client";
import Link from "next/link";
import BarChart from "@/components/graphique";
import Modal from 'react-modal';
import React, { useState, useEffect } from "react";
import Loader from '@/components/register/loader';
import { CloseIcon } from "stream-chat-react";
import type { NextPage } from "next";
import { useFormik } from "formik";
import { registerpoids,getpoids,getGrossesse } from "@/app/services";
import * as Yup from "yup";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
`;

const schema = Yup.object().shape({
  grossesse:Yup.string().required('veuillez selectionner une grossesse!'),
  poid:Yup.string().required('veuillez saisir le poids!'),
  date: Yup.date(),
  // .required('veuillez saisir la date'),
  semaine: Yup.number()
});

const Essai: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [PoidsMere, setPoids] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [grossesse, setGrossesse] = useState([]);
  const[loading,setLoading]=useState(true);

// reccuperetion des grossesses
useEffect(() => {
  getGrossesse()
    .then(response => {
      setGrossesse(response.data);
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des grossesses:', error);
    });
}, []);


  const formik = useFormik({
    initialValues: {
      poids: "",
      date: "",
    },

    validationSchema: schema,
    // Handle form submission
    onSubmit: async ({ poids, date}) => {
      try {
        setIsLoading(true); 
        const response = await registerpoids({ poids, date });
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

    const deleted = async (id:number) => {
      const confirmed = window.confirm('Voulez-vous vraiment supprimer ce rendez-vous?');
      if (confirmed) {
        // try {
        //   const response = await deleterdv(id);
        //   if (response) {
        //     console.log(response.data)
        //     setSuccessMessage("La suppression du rendez-vous s'est effectuée avec succès");
        //     window.location.reload();
        //   } else {
        //     setErrorMessage("La suppression du rendez-vous a échoué");
        //     window.location.reload();
        //   }
        // } catch (error) {
        //   setErrorMessage(" Une erreur s'est produite lors de la suppression du rendez-vous");
        //   window.location.reload();
        // }
      //  finally {
      //   setSuccessMessage('');
      // }
      }
    };
  
 
  const modifier = async (id:number) => {
    const confirmed = window.confirm('Voulez-vous vraiment modifier ce rendez-vous?');
    if (confirmed) {
    // router.replace("/grossesse");
    }
  };
  
  // useEffect(() => {
  //   getpoids()
  //     .then(response => {
  //       setPoids(response.data);
  //       console.log(response.data)
  //     })
  //     .catch(error => {
  //       console.error('Erreur lors de la récupération des medecins:', error);
  //     });
  // }, []);


  useEffect(()=>{
    setTimeout(()=>setLoading(false),1000)
  },[]);

  if(loading){
    return <Loader/>
  }

  return(
    <>
  <div className="mt-24">
    <div>
    <BarChart/>
    </div>
    <div>
      <h1>Historique complet</h1>
      <table className="border-collapse w-full">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Date </th>
            <th className="py-2 px-4 border-b">Semaine</th>
            <th className="py-2 px-4 border-b">Poids</th>
            <th className="py-2 px-4 border-b">Variation</th>
            <th className="py-2 px-4 border-b">Actions</th> 
            <th className="py-2 px-4 border-b">Others</th> 
          </tr>
          
        </thead>
        {/* <tbody>
          {PoidsMere.map((p) => (
            <tr 
            key={p.id}
            >
              <td className="py-2 px-4 border-b">
                {p.created_at}
              </td>
              <td className="py-2 px-4 border-b">
                {p.semaine}
              </td>
              <td className="py-2 px-4 border-b">
                {p.poids}
              </td>
              <td className="py-2 px-4 border-b">
                {p.variation}
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  // onClick={() => handleSelectGrossesse(g)}
                >
                  Modifier
                </button>
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  // onClick={() => modifier(g.id)} 
                >
                  Modifier
                </button>
              </td>
            </tr>
          ))} 
        </tbody> */}
      </table>
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
              <h1 className="text-2xl font-bold mb-4">POIDS</h1>
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
                id="poids"
                value={values.poids}
                onChange={handleChange}
                placeholder="poids"
                className="w-full border border-gray-300 p-2 mb-4 rounded"/>
          {errors.poids && touched.poids && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.poids}</span>}
              <input
                id="date"
                type="date" 
                value={values.date}
                onChange={handleChange}
                name="date"
                className="w-full border border-gray-300 p-2 mb-4 rounded" />
                {errors.date && touched.date && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.date}</span>}
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
    <div className="flex justify-center mt-8">
      <button onClick={handleClick} className="transition duration-500 ease-in-out hover:bg-indigo-900 inline-block bg-blue-600 text-lg font-medium rounded-full text-white px-4 py-2 cursor-pointer">Ajouter poids</button>
    </div>
  </div>    
    </>
  )
}
export default Essai;