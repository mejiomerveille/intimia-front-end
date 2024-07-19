"use client";
import Update from "@/components/rdv/modifRdv";
import Loader from "@/components/register/loader";
import { useState, useEffect } from 'react';

export default function UpdateRdv(){
    const[loading,setLoading]=useState(true);

    useEffect(()=>{
        setTimeout(()=>setLoading(false),1000)
      },[]);
    
      if(loading){
        return <Loader/>
      }
    return(  
        <div>
            <Update/>
        </div>      
    );
}