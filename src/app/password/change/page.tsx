"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { NextPage } from "next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { changePassword } from "@/app/services";
import { css } from "@emotion/react";
import { BeatLoader } from "react-spinners";
import { useState, useEffect } from 'react';
import Loader from "@/components/register/loader";
// t-LeCxPhU$r4PRbv
const override = css`
  display: block;
  margin: 0 auto;
`;
const schema = Yup.object().shape({
  old_password: Yup.string().required().min(8),
  // .notOneOf([Yup.ref("old_password"), null], "Le nouveau mot de passe doit être différent de l'ancien"),
  new_password: Yup.string().required().min(8),
  new_password2: Yup.string().required().min(8).oneOf([Yup.ref("new_password"), null], "Les mots de passe doivent correspondre"),
});

const ChangePassword: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
      new_password2: "",
    },

    validationSchema: schema,

    // Handle form submission
    onSubmit: async ({ old_password, new_password, new_password2 }) => {
      try {
        setIsLoading(true);
        const response = await changePassword({ old_password, new_password,new_password2 });
        if (response.statut==="success" && response.code===200) {
          console.log(response);
          setSuccessMessage('Mot de passe modifié avec succès !');
          router.replace("profil"); 
        } else if(response.statut==="error" && response.code===400) {
          setErrorMessage('Mot de passe incorrect.');
        }
      } catch (error) {
        console.error(error);
        setErrorMessage('Erreur lors de la modification du mot de passe.');
      } finally {
        setIsLoading(false);
      }
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="mx-auto p-10 rounded-md shadow-md bg-gray-800 text-white mt-24 ">
        <h2 className="text-2xl font-bold text-center mb-8">Modifier le mot de passe</h2>

        <form onSubmit={handleSubmit} method="POST">
          <label htmlFor="old_password" className="block mb-2">
            Ancien mot de passe :
          </label>
          <input
            onChange={handleChange}
            type="password"
            value={values.old_password}
            id="old_password"
            name="old_password"
            className="px-3 py-2 w-80 rounded-md border border-gray-400 bg-gray-400 focus:outline-none focus:ring focus:ring-green-500"
          />
          {errors.old_password && touched.old_password && (
            <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {errors.old_password}
            </span>
          )}
          <label htmlFor="new_password" className="block mb-2">
            Nouveau mot de passe :
          </label>
          <input
            onChange={handleChange}
            type="password"
            value={values.new_password}
            id="new_password"
            name="new_password"
            className="px-3 py-2 w-80 rounded-md border border-gray-400 focus:outline-none focus:ring focus:ring-green-500"
          />
          {errors.new_password && touched.new_password && (
            <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {errors.new_password}
            </span>
          )}
          <label htmlFor="new_password2" className="block mb-2">
            Retapez le nouveau mot de passe :
          </label>
          <input
            onChange={handleChange}
            type="password"
            value={values.new_password2}
            id="new_password2"
            name="new_password2"
            className="px-3 py-2 w-80 rounded-md border border-gray-400 focus:outline-none focus:ring focus:ring-green-500"
          />
          {errors.new_password2 && touched.new_password2 && (
            <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {errors.new_password2}
            </span>
          )}
          <div className="col-span-2 flex justify-between ">
            <Link href="/profil">
              <button
                type="button"
                className="block mb-2 mt-10 px-3  py-2 rounded-md border border-gray-400 focus:outline-none focus:ring focus:ring-green-5000"
              >
                {isLoading ? (
                  <BeatLoader
                    color={"#ffffff"}
                    loading={isLoading}
                    css={override}
                    size={10}
                  />
                ) : (
                  "Annuler"
                )}
              </button>
            </Link>

            <button
              type="submit"
              className="block mb-2 mt-10 px-3  py-2 rounded-md border border-gray-400 focus:outline-none focus:ring focus:ring-green-5000"
            >
              {isLoading ? (
                <BeatLoader
                  color={"#ffffff"}
                  loading={isLoading}
                  css={override}
                  size={10}
                />
              ) : (
                "Valider"
              )}
            </button>
          </div>
        </form>
        {successMessage && (
          <p className="bg-green-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            {successMessage}
          </p>
        )}
        {errorMessage && (
          <p className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            {errorMessage}
          </p>
        )}
      </div>
    </>
  );
};
export default ChangePassword;