"use client";
import type { NextPage } from "next";
import { useFormik } from "formik";
import { css } from "@emotion/react";
import { BeatLoader } from "react-spinners";
import * as Yup from "yup";
import { useState } from 'react';
import { registerMedecin } from '../../app/services';
import { useRouter } from "next/navigation";


const override = css`
  display: block;
  margin: 0 auto;
`;
// Yup schema to validate the form
const schema = Yup.object().shape({
    Nom: Yup.string().required(),
    Profession: Yup.string().required(),
    Téléphone: Yup.string().required().min(9),
  email: Yup.string().required().email(),
});


const Medecin: NextPage = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();


  // Formik hook to handle the form state
  const formik = useFormik({
    initialValues: {
        Nom: "",
        Profession: "",
        Téléphone: "",
        email: "",
     
    },

    // Pass the Yup schema to validate the form
    validationSchema: schema,

    // Handle form submission
    onSubmit: async ({ Nom,Profession,Téléphone, email}) => {
      try {
        setIsLoading(true); 
        const response = await registerMedecin({ Nom, Profession,Téléphone, email});
        if (response) {
          setSuccessMessage('enregistrement réussie !');
          const url = localStorage.getItem('URL') ;
            if (url) {
              router.replace(url);
            }
        } else {
          setErrorMessage('Erreur lors de l\'enregistrement.');
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
        <h1 className="text-xl font-bold my-4">Ajouter un medecin</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3" method="POST">
          <input
            type="text"
            name="Nom"
            value={values.Nom}
            onChange={handleChange}
            id="Nom"
            placeholder="Nom"

          />
          {errors.Nom && touched.Nom && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.Nom}</span>}

          <input
            type="text"
            name="Profession"
            value={values.Profession}
            onChange={handleChange}
            id="Profession"
            placeholder="Profession"

          />
          {errors.Profession && touched.Profession && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.Profession}</span>}
          <input
            type="number"
            name="Téléphone"
            value={values.Téléphone}
            onChange={handleChange}
            id="Téléphone"
            placeholder="Téléphone"

          />
          {errors.Téléphone && touched.Téléphone && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.Téléphone}</span>}

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
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2" disabled={isLoading} type="submit"> 
          {isLoading ? (
            <BeatLoader color={"#ffffff"} loading={isLoading} css={override} size={10} />
          ) : (
            "Ajouter"
          )}
          </button>
        </form>
        {successMessage && <p className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{successMessage}</p>}
        {errorMessage && <p className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Medecin;