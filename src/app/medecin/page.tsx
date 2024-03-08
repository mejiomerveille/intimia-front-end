"use client";
import type { NextPage } from "next";
import { useFormik } from "formik";
import { css } from "@emotion/react";
import { BeatLoader } from "react-spinners";
import * as Yup from "yup";
import { useState } from 'react';
import axios from 'axios';

const override = css`
  display: block;
  margin: 0 auto;
`;

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Le nom est requis.'),
  profession: Yup.string().required('La profession est requise.'),
  phone_number: Yup.string().required('Le numéro de téléphone est requis.').min(9, 'Le numéro de téléphone doit avoir au moins 9 caractères.'),
  email: Yup.string().required('L\'adresse e-mail est requise.').email('L\'adresse e-mail n\'est pas valide.'),
});

const Medecin: NextPage = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      profession: '',
      phone_number: '',
      email: '',
    },
    validationSchema,
    onSubmit: async ({ name, profession, phone_number, email }) => {
      try {
        setIsLoading(true);
        const response = await axios.post('http://localhost:8000/api/v1/rdv/add_medecins/', {
          name,
          profession,
          phone_number,
          email,
        });
        if (response) {
          setSuccessMessage('Enregistrement réussi !');
          const url = localStorage.getItem('URL1');
          console.log(url);
        } else {
          setErrorMessage('Erreur lors de l\'enregistrement.');
        }
      } catch (error) {
        console.error(error);
        setErrorMessage('Erreur lors de la communication avec le serveur.');
      } finally {
        setIsLoading(false);
         // Réinitialiser les messages après la soumission
      // setSuccessMessage('');
      // setErrorMessage('');
      }
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400 bg-gray-50">
        <h1 className="text-xl font-bold my-4">Ajouter un médecin</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3" method="POST">
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            id="name"
            placeholder="Nom"
          />
          {errors.name && touched.name && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.name}</span>}

          <label htmlFor="profession">Profession</label>
          <input
            type="text"
            name="profession"
            value={values.profession}
            onChange={handleChange}
            id="profession"
            placeholder="Profession"
          />
          {errors.profession && touched.profession && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.profession}</span>}

          <label htmlFor="phone_number">Téléphone</label>
          <input
            type="number"
            name="phone_number"
            value={values.phone_number}
            onChange={handleChange}
            id="phone_number"
            placeholder="Téléphone"
          />
          {errors.phone_number && touched.phone_number && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.phone_number}</span>}

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="Email"
          />
          {errors.email && touched.email && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.email}</span>}

          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2" disabled={isLoading} type="submit">
            {isLoading ? (
              <BeatLoader color={"#ffffff"} loading={isLoading} css={override} size={10} />
            ) : (
              "Ajouter"
            )}
          </button>
        </form>
        {successMessage && <p className="bg-green-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{successMessage}</p>}
        {errorMessage && <p className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Medecin;