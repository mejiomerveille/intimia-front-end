'use client';
import React ,{useState,useEffect} from 'react'
import EvolutionGrossesseForm from '@/components/grossesse/HomeGrossesse'
import Accuiel from './Accuil';
import { verifyLogin } from '@/app/services';
verifyLogin

export default function  Home(){
  const [el, setel] = useState("");
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await verifyLogin();
        if (response) {
          if(response.status == 200 && response.statusText=="OK"){
            setel(response.statusText);
            console.log(response.status);
          }
        } else {
          setErrorMessage('veuillez vous connecter!');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if(el=='OK'){
    return(
        <EvolutionGrossesseForm/>
    )
  }else{
    return(
      <Accuiel />
    )
  }

}
