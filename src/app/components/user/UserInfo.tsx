"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";

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

  // const signOut = () => {
  // const router = useRouter();
  //   try {
  //      // Supprimer le token du localStorage
  //      localStorage.removeItem('token');
  //     const response = await fetch('http://127.0.0.1:8000/api/logout/', {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json'
  //       }
  //     })
  //     if (response.ok) {
  //       // Mettre à jour l'état de l'utilisateur à null pour afficher l'écran de connexion
  //       setUser(null);
  //       router.replace("dashboard");
  //     } else {
  //       console.error('Erreur lors de la requête');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  if (user) {
    return (
      <div className="bg-pink-100">
      <div className="grid place-items-center">
        <div className="shadow-lg p-8 bg-zinc-300 flex flex-col gap-2 my-6">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
          <div>
            Nom d'utilisateur : <span className="font-bold">{user.username}</span>
          </div>
          <div>
            Email : <span className="font-bold">{user.email}</span>
          </div>
          <button
          // onClick={() => signOut()}
           className="bg-red-500 text-white font-bold px-6 py-2 mt-3">Log Out</button>
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
            <li className='cursor-pointer hover:bg-red-500'>Paramètres de la grossesse<span className="material-icons mr-2 text-gray-600 text-2xl">chevron_right</span> </li>
            <li className='cursor-pointer hover:bg-red-500'>Graphiques et rapports<span className="material-icons mr-2 text-gray-600 text-2xl">chevron_right</span></li>
            <li className='cursor-pointer hover:bg-red-500'>Cycle et ovulation<span className="material-icons mr-2 text-gray-600 text-2xl">chevron_right</span></li>
            <li className='cursor-pointer hover:bg-red-500'>Code d'accès<span className="material-icons mr-2 text-gray-600 text-2xl">chevron_right</span></li>
            <li className='cursor-pointer hover:bg-red-500'>Parametre<span className="material-icons mr-2 text-gray-600 text-2xl">chevron_right</span></li>
            <li className='cursor-pointer hover:bg-red-500'>Rappels<span className="material-icons mr-2 text-gray-600 text-2xl">chevron_right</span></li>
            <li className='cursor-pointer hover:bg-red-500'>Aide<span className="material-icons mr-2 text-gray-600 text-2xl">chevron_right</span></li>
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