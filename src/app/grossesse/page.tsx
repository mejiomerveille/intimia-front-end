"use client";
import { useState, useEffect } from 'react';
import RegisterGrossesseForm from "@/components/grossesse/RegisterGrossesse";
import Welcome from '../welcome/page';
import { getGrossesse } from '../services';
import Loader from '@/components/register/loader';

export default function blog(){
  const[loading,setLoading]=useState(true);
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

  useEffect(()=>{
    setTimeout(()=>setLoading(false),1000)
  },[]);


  


  if(grossesse.length===0){
    console.log(grossesse)
   
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
