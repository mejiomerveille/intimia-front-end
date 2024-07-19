"use client";
import { useRouter } from 'next/navigation';
import React, { useState,useEffect } from 'react';
import Loader from '@/components/register/loader';


const Inscription = () => {
  const[loading,setLoading]=useState(true);
  const [donnees, setDonnees] = useState({
    nom: '',
    email: '',
    motDePasse: '',
    confirmationMotDePasse: '',
  });
  const [erreurs, setErreurs] = useState({});
  const router = useRouter();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDonnees((prevState) => ({ ...prevState, [name]: value }));
    setErreurs((prevErreurs) => ({
      ...prevErreurs,
      [name]: '',
    }));
  };



  useEffect(()=>{
    setTimeout(()=>setLoading(false),1000)
  },[]);

  if(loading){
    return <Loader/>
  }

  return (
    <div className="container mx-auto mt-24">
      <h1 className="text-2xl font-bold text-center">Inscription</h1>
      
    </div>
  );
};

export default Inscription;