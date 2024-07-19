"use client";
import Profile from "@/components/user/UserInfo";
import Loader from "@/components/register/loader";
import { useState, useEffect } from 'react';

export default function dashboard() {

    const[loading,setLoading]=useState(true);
    useEffect(()=>{
        setTimeout(()=>setLoading(false),1000)
      },[]);
    
      if(loading){
        return <Loader/>
      }
    return (
        <main>
            <Profile/>
        </main>
    )
}