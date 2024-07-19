"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { NextPage } from "next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "@/app/services";
import { css } from "@emotion/react";
import { BeatLoader } from "react-spinners";
import { useState, useEffect } from 'react';
import Loader from "@/components/register/loader";
import { BG,FB,GG,TW} from "../../app/services";

const override = css`
  display: block;
  margin: 0 auto;
`;
const schema = Yup.object().shape({
  username: Yup.string().required('veuillez saisir votre numero de telephone'),
  password: Yup.string().required('veuillez saisir votre mot de passe').min(8),
});

const Signin: NextPage = () => {
  const[loading,setLoading]=useState(true);
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
          setErrorMessage('nom ou mot de passe incorrect.');
        }
      } catch (error) {
        console.error(error);
        if(error.response.data.detail=='No active account found with the given credentials') {
          setErrorMessage('cet utilisateur nexiste pas!');
        }
        setErrorMessage('Erreur lors de la communication avec le serveur.');
      } finally {
        setIsLoading(false); 
      }
    },
  });
  const { errors, touched, values, handleChange, handleSubmit } = formik;
  
  useEffect(()=>{
    setTimeout(()=>setLoading(false),1000)
  },[]);

  if(loading){
    return <Loader/>
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col justify-center items-center p-6 w-full">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex items-center">
        <div className="w-1/2 flex flex-col justify-center items-center">
            <img
              src={BG}
              alt="Illustration"
              className="max-h-full max-w-full w-96"
            />
            <div className="mt-4 text-center">
              <Link className="text-sm mt-3" href={"/password/get_otp"}>
                Mot de passe oublié? <span className="underline">creer un nouveau</span>
              </Link><br />
              <Link className="text-sm mt-3" href={"/register"}>
                Vous n&apos;avez pas de compte? <span className="underline">S'inscrire</span>
              </Link>
            </div>
          </div>
          <div className="w-1/2">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Formulaire de connexion</h1>
            <form className="w-full max-w-md" onSubmit={handleSubmit} method="POST">
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  Numero de Télephone
                </label>
                <input
                 onChange={handleChange}
                 type="text"
                 value={values.username}
                 id="username"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="555 666 777"
                  />
              {errors.username && touched.username && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.username}</span>}
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                  Mot de Passe
                </label>
                <input
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  id="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="********"
                  />
              {errors.password && touched.password && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.password}</span>}
              </div>
              <div className="flex items-center mb-4">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className="text-gray-700 text-sm font-bold">
                  Se souvenir de moi
                </label>
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline"
                >
                  {isLoading ? (
                      <BeatLoader color={"#ffffff"} loading={isLoading} css={override} size={10} />
                    ) : ( "Se connecter"
                  )}
                </button>
              </div>
              <div className="mt-4 text-center">
                <span className="text-gray-700 text-sm font-bold">Ou se connecter avec</span>
                <div className="flex justify-center mt-2">
                  <button className="hover:bg-blue-700 text-white font-bold py-2 px-4  rounded focus:outline-none focus-shadow-outline mr-2">
                    {/* <i className="fab fa-facebook-f"></i> */}
                    <img
              src={FB}
              alt="Illustration"
              className="max-h-full max-w-full w-10 h-10"
            />
                  </button>
                  <button className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline mr-2">
                    {/* <i className="fab fa-twitter"></i> */}
                    <img
              src={TW}
              alt="Illustration"
              className="max-h-full max-w-full w-10 h-10"
            />
                  </button>
                  <button className="hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline">
                    {/* <i className="fab fa-google"></i> */}
                    <img
              src={GG}
              alt="Illustration"
              className="max-h-full max-w-full w-10 h-10"
            />
                  </button>
                </div>
              </div>
            </form>
          </div>
          
        </div>
      </div>
    </div>

  );
}
export default Signin;
