"use client";
import Forfaits from '@/components/acceuil/forfait';
import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from "next/navigation";
import { register } from '../../app/services';
import Profil from '@/components/register/Profil';
import InfoCompte from '@/components/register/InfomationsDuCompte';
import InfoPersonelle from '@/components/register/InformationsPersonnelles';
import Loader from "@/components/register/loader";
import {  useEffect } from 'react';
export default function Signup() {
  const[loading,setLoading]=useState(true);
  const router = useRouter();
  const [etape, setEtape] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const [donnees, setDonnees] = useState({
    profil: '',
    first_name: '',
    last_name: '',
    sexe: '',
    genre: '',
    pays: '',
    last_graduation: '',
    lieu_naissance: '',
    religion: '',
    roles_religieux: '',
    denomination: '',
    telephone: '',
    email: '',
    prefession: '',
    password: '',
    password2: '',
  });
  const [erreurs, setErreurs] = useState({});
  // const router = useRouter();

  const handleChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setDonnees((prevState) => ({ ...prevState, [name]: value }));
    setErreurs((prevErreurs) => ({
      ...prevErreurs,
      [name]: '',
    }));
  };
 
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
 
    const handleDateChange = (date: React.SetStateAction<Date | null>) => {
        setDateOfBirth(date);
      };
      
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 12);
  
  const handleValidation = () => {
    const erreurs = {};
    if(etape===2){
      if(!dateOfBirth){
        erreurs.dateOfBirth='La date de naissance est obligatoire!'
      }
      if (donnees.first_name==='') {
        erreurs.first_name = 'Le nom est obligatoire';
      }
    }else if(etape===3){

      if (donnees.email==='') {
        erreurs.email = 'L\'adresse e-mail est obligatoire';
      }
      if (!donnees.password) {
        erreurs.password = 'Le mot de passe est obligatoire';
      }
      if (!donnees.password2) {
        erreurs.password2 = 'La confirmation du mot de passe est obligatoire';
      }
      if (donnees.password!=donnees.password2) {
        erreurs.password2 = 'Les mots de passe doivent etre identique';
      }
    }

    if (Object.keys(erreurs).length > 0) {
      setErreurs(erreurs);
      return false;
    }
    return true;
  };
  const handleSubmit = async()=>{
    const data={
      email:donnees.email,
      password:donnees.password,
      password2:donnees.password2,
      first_name:donnees.first_name,
      last_name:donnees.last_name,
      profil:donnees.profil,
      date_naissance:dateOfBirth,
      sexe:donnees.sexe,
      lieu_naissance:donnees.lieu_naissance,
      genre:donnees.genre,
      pays:donnees.pays,
      last_graduation:donnees.last_graduation,
      religion:donnees.religion,
      roles_religieux:donnees.roles_religieux,
      denomination:donnees.denomination,
      telephone:donnees.telephone,
      prefession:donnees.prefession,
    }
    try {
      // setIsLoading(true); 
      const response = await register({data});
      console.log(data)
          if (response) {
            console.log(response)
            setSuccessMessage('Inscription réussie !');
            router.replace("login");
          } else {
            setErrorMessage('Erreur lors de l\'inscription.');
          }
        } catch (error) {
          console.error(error);
          setErrorMessage('Erreur lors de la communication avec le serveur.');
        } finally {
          // setIsLoading(false); 
        }
      };

      const handleNext = () => {
        if (etape === 4) {
          console.log('Données d\'inscription:', donnees);
          return;
        }
    
        if (!handleValidation()) {
          return;
        }
    
        setEtape((prevEtape) => prevEtape + 1);
      };
    
      const handlePrevious = () => {
        if (etape === 1) {
          return;
        }
        setEtape((prevEtape) => prevEtape - 1);
      };
    

  const handleProfil = (profils) => {
    donnees.profil=profils;
    setEtape((prevEtape) => prevEtape + 1);
    }


        
useEffect(()=>{
  setTimeout(()=>setLoading(false),1000)
},[]);

if(loading){
  return <Loader/>
}

  return (
    <div className="we container mx-auto p-10 rounded-md shadow-md bg-gray-800 text-white mt-24">
      <h2 className="text-2xl font-bold text-center mb-8">formulaire d'inscription</h2>

      <div className="steps flex justify-between mb-6">
        <div
          className={`step p-4 rounded-md ${
            etape === 1 ? 'bg-green-500' : 'bg-gray-600'
          }`}>
          <span className="ml-2">Profil</span>
        </div>
        <div
          className={`step p-4 rounded-md ${
            etape === 2 ? 'bg-green-500' : 'bg-gray-600'
          }`}>
          <span className="ml-2">informations personnelles</span>
        </div>
        <div
          className={`step p-4 rounded-md ${
            etape === 3 ? 'bg-green-500' : 'bg-gray-600'
          }`}>
          <span className="ml-2">Infomations du compte</span>
        </div>
        <div
          className={`step p-4 rounded-md ${
            etape === 4 ? 'bg-green-500' : 'bg-gray-600'
          }`}>
          <span className="ml-2">les forfaits </span>
        </div>
      </div>

      <div className="step-content">

          {etape === 1 && (<Profil handleSubmit={handleSubmit} handleProfil={handleProfil}/>)}
          {etape === 2 && (<InfoPersonelle handleSubmit={handleSubmit} donnees={donnees} handleChange={handleChange} erreur={erreurs} handleNextStep={handleNext} handlePrevStep={handlePrevious} handleDateChange={handleDateChange} minDate={minDate} />)}

          {etape === 3 && (<InfoCompte handleSubmit={handleSubmit} donnees={donnees} handleChange={handleChange} erreur={erreurs} handleNextStep={handleNext} handlePrevStep={handlePrevious}/> )}

        {etape === 4 && (
          <div>
            <form onSubmit={handleSubmit} action="" method="post">
            <Forfaits/>
            </form>
            <button
              type="button"
              onClick={handlePrevious}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-gray-500"
            >
              Previous
            </button>
            {/* <form onSubmit={handleSubmit} action="" method="post">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-green-500"
            >
              Submit
            </button>
            </form> */}
            {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
            {successMessage && <p className="text-green-500 text-sm mt-1">{successMessage}</p>}
            
          </div>
        )}
      </div>

      <div className="step-counter text-right mt-4">
        {etape}/{4}
      </div>
    </div>
  );
}