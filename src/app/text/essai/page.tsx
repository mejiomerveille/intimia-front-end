"use client";
import React from 'react';
import SearchBar from '@/components/SearchBar';
import { useState, useEffect } from 'react';
import Loader from '@/components/register/loader';


const BlogPages = () => {
  const[loading,setLoading]=useState(true);

  useEffect(()=>{
    setTimeout(()=>setLoading(false),1000)
  },[]);

  if(loading){
    return <Loader/>
  }
  return  <div className="bg-blue-100 min-h-screen flex justify-center items-center">
  <div className="bg-white p-8 rounded-lg shadow-md w-96">
    <h1 className="text-2xl font-bold mb-4">Welcome np</h1>
    <input
      type="text"
      placeholder="Name"
      className="w-full border border-gray-300 p-2 mb-4 rounded"
    />
    <input
      type="email"
      placeholder="Email"
      className="w-full border border-gray-300 p-2 mb-4 rounded"
    />
    <input
      type="password"
      placeholder="Password"
      className="w-full border border-gray-300 p-2 mb-4 rounded"
    />
    <p className="text-sm text-gray-500 mb-4">
      By signing up you agree to terms of use and privacy policy.
    </p>
    <button className="bg-blue-500 text-white w-full py-2 rounded">
      Sign Up
    </button>
  </div>
</div>;
};

export default BlogPages;
