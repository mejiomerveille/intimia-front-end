'use client'

import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import Headline from './Headline';

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword] = useState('');
  const [password2, setRePassword] = useState('');
  const [errors, setErrors] = useState([]);

  // Get CSRF token
  const getCsrfToken = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/csrf/', {
      credentials: 'include',
    });
    const data = await response.json();
    console.log(data)
    return data.csrfToken; 
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      username,
      email,
      password1,
      password2,
    };

    const csrfToken = await getCsrfToken();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("resource created")
        const responseData = await response.json();
        console.log(responseData);
      } else if (response.status === 400) {
        const errorData = await response.json();
        console.error('Error during the request:', errorData);
        setErrors(errorData);
      } else {
        console.error('Erreur lors de la requête');
      }
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-500  ">
        <h1 className="text-xl font-bold my-4 text-center">S'inscrire avec</h1>
        <div className="flex w-full justify-around pb-3">
          <Image src="/facebook.jpeg" width={50} height={50} alt='logo de facebook'/>
          <Image src="/ggg-playstore.png" width={50} height={50} alt='logo de facebook'/>
          <Image src="/ttt-playstore.png" width={50} height={50} alt='logo de facebook'/>
        </div>
        <div>
          <Headline title="ou" />
        </div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nom d'utilisateur"
          />
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            name="password1"
            value={password1}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
          />
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={(e) => setRePassword(e.target.value)}
            placeholder="reecrir le Mot de passe"
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2" type="submit">
            Créer un compte
          </button>
          {/* <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2"> */}
            {Object.keys(errors).map((field) => (
              <div key={field} className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                {field}: {errors[field].join(', ')}
              </div>
            ))}
          {/* </div> */}

          <Link className="text-sm mt-3 text-right" href="/">
            Vous avez déjà un compte ? <span className="underline">Connectez-vous</span>
          </Link>
        </form>
      </div>
    </div>
  );
};
export default RegisterForm;