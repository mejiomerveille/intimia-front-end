"use client";
import React, { useState, useEffect } from "react";
import Loader from '@/components/register/loader';

export default function essai(){
  const[loading,setLoading]=useState(true);

  useEffect(()=>{
    setTimeout(()=>setLoading(false),1000)
  },[]);

  if(loading){
    return <Loader/>
  }

  return(
<div>Bienvenue dans la pae ventre de la mere</div>    
  )
}