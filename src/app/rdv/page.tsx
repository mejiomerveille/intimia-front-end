"use client"
import Rendez_vous from "@/components/rdv/enregi";
import Loader from "@/components/register/loader";
import { useState, useEffect } from 'react';

export default function RegisRdv(){
    const[loading,setLoading]=useState(true);

    useEffect(()=>{
        setTimeout(()=>setLoading(false),1000)
      },[]);
    
      if(loading){
        return <Loader/>
      }
    return(  
        <div>
            <Rendez_vous/>
        </div>      
    );
}