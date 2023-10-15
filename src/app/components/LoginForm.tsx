'use client'

import Link from 'next/link';
import React, { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import Headline from './Headline';


const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);


  const getCsrfToken = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/csrf/', {
      credentials: 'include',
    });
    const data = await response.json();
    console.log(data);
    return data.csrfToken;
  };
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const csrfToken = await getCsrfToken();
  try {

    const response = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify(formData),
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
};


  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-500">
        <h1 className="text-xl font-bold my-4 text-center">Se connecter avec</h1>
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
            id="username"
            placeholder="username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2" type="submit">Login</button>
          
          {Object.keys(errors).map((field) => (
              <div key={field} className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                {field}: {errors[field].join(', ')}
              </div>
            ))}

          <Link className="text-sm mt-3 text-right" href={"/register"}>
            Dont have an account?
            <span className="underline"> Sign up</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
