"use client";
import type { NextPage } from "next";
import { useFormik } from "formik";
import { css } from "@emotion/react";
import { BeatLoader } from "react-spinners";
import * as Yup from "yup";
import { useState } from 'react';
import { register } from '../../app/services';
import { useRouter } from "next/navigation";


const override = css`
  display: block;
  margin: 0 auto;
`;
// Yup schema to validate the form
const schema = Yup.object().shape({
  username: Yup.string().required(),
  first_name: Yup.string().required(),
  last_name: Yup.string().required(),
  email: Yup.string().required().email(),
  password: Yup.string().required().min(8),
  password2: Yup.string().required().oneOf([Yup.ref('password')], 'Les mots de passe doivent correspondre.'),
});


const Signup: NextPage = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();


  // Formik hook to handle the form state
  const formik = useFormik({
    initialValues: {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password2: "",
    },

    // Pass the Yup schema to validate the form
    validationSchema: schema,

    // Handle form submission
    onSubmit: async ({ username,first_name,last_name, email, password, password2}) => {
      try {
        setIsLoading(true); 
        const response = await register({ username, first_name,last_name, email, password ,password2});
        if (response) {
          setSuccessMessage('Inscription réussie !');
          router.replace("login");
        } else {
          setErrorMessage('Erreur lors de l\'inscription.');
        }
      } catch (error) {
        console.error(error);
        setErrorMessage('Erreur lors de la communication avec le serveur.');
      } finally {
        setIsLoading(false); // Désactiver le loader
      }
    },
  });

  // Destructure the formik object
  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400 bg-gray-50">
        <h1 className="text-xl font-bold my-4">Inscription</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3" method="POST">
          <input
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
            id="username"
            placeholder="Pseudo"

          />
          {errors.username && touched.username && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.username}</span>}

          <input
            type="text"
            name="first_name"
            value={values.first_name}
            onChange={handleChange}
            id="first_name"
            placeholder="Nom"

          />
          {errors.first_name && touched.first_name && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.first_name}</span>}
          <input
            type="text"
            name="last_name"
            value={values.last_name}
            onChange={handleChange}
            id="last_name"
            placeholder="Prenom"

          />
          {errors.last_name && touched.last_name && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.last_name}</span>}

          {/* <label htmlFor="email">Email</label> */}
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="Email"

          />
          {errors.email && touched.email && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.email}</span>}

          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="Mot de passe"

            
          />
          {errors.password && touched.password && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.password}</span>}


          <input
            type="password2"
            name="password2"
            value={values.password2}
            onChange={handleChange}
            id="password2"
            placeholder="Reecrire le mot de passe"

          />
          {errors.password2 && touched.password2 && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.password2}</span>}

          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2" disabled={isLoading} type="submit"> 
          {isLoading ? (
            <BeatLoader color={"#ffffff"} loading={isLoading} css={override} size={10} />
          ) : (
            "Submit"
          )}
          </button>
        </form>
        {successMessage && <p className="bg-green-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{successMessage}</p>}
        {errorMessage && <p className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Signup;