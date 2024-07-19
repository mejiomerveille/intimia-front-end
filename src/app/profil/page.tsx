"use client";
import Image from 'next/image';
import React, { useState,useEffect } from 'react';
import profil from '../../../public/_03738fac-c470-4e45-80dd-7211997088dd-removebg-preview.png'
import { getUserInfo,currentWeek } from '../services';
import moment from 'moment';


const PregnancyProfilePage = () => {
  const [profilePicture, setProfilePicture] = useState('');
  const [user, setUser] = useState([]);
  const [numSemaine, setNumSemaine] = useState(1);
  const [dueDate, setDueDate] = useState('');

  
  useEffect(() => {
    getUserInfo()
      .then(response => {
        setUser(response);
        console.log(response);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des grossesses:', error);
      });
  }, []);

  useEffect(() => {
    currentWeek()
      .then(response => {
        setNumSemaine(response.start_week);
        setDueDate(response.dueDate);
        // console.log(response)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération de semaine:', error);
      });
  }, []);

  const { first_name,last_name, email } = user;

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setProfilePicture(imageUrl);
  };

  const userPlan = {
    name: 'Premium',
    features: ['Suivi détaillé de la grossesse', 'Accès aux ressources exclusives', 'Notifications personnalisées'],
  };

  if(!user){
    return(
      <div className='mt-20'>
        <h1 className='text-5xl text-red-500'>veuillez vous connecter pour consulter votre profil</h1>
      </div>
    )
  }

  return (
    <div className="mt-20 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-pink-500 to-purple-500">
          <div className="flex items-center px-6 py-4">
            <div className="relative">
              <Image
                src={profil}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white mr-4"
              />
            </div>
            <div className='ml-5'>
              <h2 className="text-xl font-bold">{first_name} {last_name}</h2>
              <p className="text-gray-700">Femme au foyer</p>
            </div>
            <div className='ml-16'>
              <p className="font-bold">Intimia premium</p>
              {/* <button className="mt-2 w-24 h-10 rounded-md bg-yellow-500 ml-44"><a href="/Edit_profil">Modifier</a></button> */}
            </div>
            <div className='ml-16'>
              <button className="mt-2 text-sm w-24 h-10 rounded-md bg-yellow-500 "><a href="/password/change">Changer mot de passe</a></button>
              <button className="mt-2 w-24 h-10 rounded-md bg-yellow-500 "><a href="/Edit_profil">Modifier</a></button>
            </div>
          </div>
          </div>
          <div className="border-t border-gray-200 px-6 py-4">
            <h3 className="text-lg font-bold mb-2">Mon objectif</h3>
            <div className="bg-green-100 p-4 rounded-lg flex justify-around">
              <p className="text-black font-bold">Suivie de cycle</p>
              <p className="text-black font-bold">Concevoir</p>
              <p className="text-green-500 font-bold">Suivie de grossesse</p>
            </div>
          </div>
          <div className="border-t border-gray-200 px-6 py-4">
            <h3 className="text-lg font-bold mb-2">Ma grossesse</h3>
            <div className="bg-pink-100 p-4 rounded-lg">
              <p className="text-pink-500 font-bold">Semaine {numSemaine}</p>
              <p className="text-gray-700">Votre accouchement est prevu pour le {moment(dueDate).format('DD MMM , YYYY')}.</p>
            </div>
          </div>
          <div className="border-t border-gray-200 px-6 py-4">
            <h3 className="text-lg font-bold mb-2">Contact</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500">Email</p>
                <p>{email}</p>
              </div>
              <div>
                <p className="text-gray-500">numero de telephone</p>
                <p>+ (237) 679596656</p>
              </div>
              <div>
                <p className="text-gray-500">Adresse</p>
                <p>Cameroun, Yaounde</p>
              </div>
              <div>
                <p className="text-gray-500">sexe</p>
                <p>Feminin</p>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PregnancyProfilePage;