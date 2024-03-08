"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { NextPage } from "next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from 'react';
import { login } from "@/app/services";
import { css } from "@emotion/react";
import { BeatLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
`;
const schema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required().min(8),
});

const Signin: NextPage = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);


  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: schema,

    // Handle form submission
    onSubmit: async ({ username, password}) => {
      try {
        setIsLoading(true); 
        const response = await login({ username, password });
        if (response) {
          console.log(response)
          setSuccessMessage('connexion réussie !');
            router.replace("grossesse");
        } else {
          setErrorMessage('Erreur lors de la connexion.');
        }
      } catch (error) {
        console.error(error);
        setErrorMessage('Erreur lors de la communication avec le serveur.');
      } finally {
        setIsLoading(false); // Désactiver le loader
      }
    },
  });
  const { errors, touched, values, handleChange, handleSubmit } = formik;


  return (
    <div className="grid place-items-center h-screen ">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400 bg-gray-50">
        <h1 className="text-xl font-bold my-4">Connexion</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={handleChange}
            type="text"
            value={values.username}
            id="username"
            placeholder="Pseudo"
          />
          {errors.username && touched.username && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.username}</span>}

          <input
            onChange={handleChange}
            type="password"
            value={values.password}
            id="password"
            placeholder="Password"
          />
          {errors.password && touched.password && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.password}</span>}

          <button disabled={isLoading} className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
          {isLoading ? (
            <BeatLoader color={"#ffffff"} loading={isLoading} css={override} size={10} />
          ) : (
            "Submit"
          )}
          
          </button>
          
          <Link className="text-sm mt-3 text-right" href={"/register"}>
            Don&apos;t have an account? <span className="underline">Register</span>
          </Link>
        </form>
        {successMessage && <p className="bg-green-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{successMessage}</p>}
        {errorMessage && <p className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errorMessage}</p>}
      </div>
    </div>
  );
}
export default Signin;
