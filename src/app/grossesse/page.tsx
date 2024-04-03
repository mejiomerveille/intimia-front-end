"use client";
import { useState, useEffect } from 'react';
import RegisterGrossesseForm from "@/components/grossesse/RegisterGrossesse";
import Welcome from '../welcome/page';
import { getGrossesse } from '../services';
Welcome
getGrossesse

export default function blog(){
  const [grossesse, setGrossesse] = useState([]);

  useEffect(() => {
    getGrossesse()
      .then(response => {
        setGrossesse(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des grossesses:', error);
      });
  }, []);

  if(!grossesse){
    return(
      <div  id="root">
      <RegisterGrossesseForm isOpened={true} />
      </div>
    )
  }else{
    return(
      <Welcome />
    )
  }
  
}
