"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const UserInfo = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // recupperer le token 
        const token = localStorage.getItem('token');
        console.log(token);
        // get the logged in user
        const response = await fetch('http://127.0.0.1:8000/api/user/', {
          headers: {
            Authorization: `Token ${token}`,
            'Accept': 'application/json'
          }
        })
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error('Erreur lors de la requête');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo();
  }, []);

  if (user) {
    return (
      <div>
      <div className="grid place-items-center">
        <div className="shadow-lg p-8 bg-zinc-300 flex flex-col gap-2 my-6">
          <div>
            Nom d'utilisateur : <span className="font-bold">{user.username}</span>
          </div>
          <div>
            Email : <span className="font-bold">{user.email}</span>
          </div>
          <button className="bg-red-500 text-white font-bold px-6 py-2 mt-3">Log Out</button>
        </div>
      </div>
      <div className='grid place-items-center'>
        <h1 className="text-xl font-bold my-4">Mon objectif:</h1>
        <div className="flex">
          <div className="rounded-full bg-blue-500 text-white py-2 px-4 mr-2">Suivre mon cycle</div>
          <div className="rounded-full bg-blue-500 text-white py-2 px-4 mr-2">Tomber enceinte</div>
          <Link  href={"grossesse"}>
          <div className="rounded-full bg-blue-500 text-white py-2 px-4">Suivre ma grossesse</div>
          </Link>
        </div>

      </div>
      <div className='grid place-items-center'>
        <div className="shadow-lg p-8 bg-zinc-300 flex flex-col gap-2 my-6 rounded-xl">
        <ul className='space-y-2'>
            <li className='cursor-pointer hover:bg-red-500'>Graphiques et rapports</li>
            <li className='cursor-pointer hover:bg-red-500'>Cycle et ovulation</li>
            <li className='cursor-pointer hover:bg-red-500'>Paramètres</li>
            <li className='cursor-pointer hover:bg-red-500'>Code d'accès</li>
            <li className='cursor-pointer hover:bg-red-500'>Rappels</li>
            <li className='cursor-pointer hover:bg-red-500'>Aide</li>
        </ul>
        </div>

</div>

      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default UserInfo;