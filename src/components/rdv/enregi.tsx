"use client";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import type { NextPage } from "next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerrdv,getGrossesse,getMedecins} from "@/app/services";
import { css } from "@emotion/react";
import { BeatLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
`;
const schema = Yup.object().shape({
  grossesse:Yup.string().required('veuillez selectionner une grossesse!'),
  doctor: Yup.string().required('veuillez selectionner le nom de votre medecin!'),
  date: Yup.string().required('veuillez saisir la date du rendez-vous'),
  time: Yup.string().required('veuillez saisir lheure du rendez-vous'),
  reminder: Yup.string(),
  notes: Yup.string(),
});

const Rendez_vous: NextPage = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [grossesse, setGrossesse] = useState([]);
  const router = useRouter();
  const [medecins, setMedecins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const formik = useFormik({
    initialValues: {
        grossesse: "",
        doctor:"",
        date: "",
        time: "",
        reminder: "",
        notes: "",
    },

    validationSchema: schema,

    // Handle form submission
    onSubmit: async ({ grossesse,doctor,date, time,reminder,notes}) => {
      try {
        setIsLoading(true); 
        const response = await registerrdv({ grossesse,doctor,date, time,reminder,notes});
        if (response) {
          console.log(response)
          setSuccessMessage('Enregistrement réussie !');
          router.replace('/rdv/rdv-list');
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
  const { errors, touched, values, handleChange, handleSubmit } = formik;

  useEffect(() => {
    getGrossesse()
      .then(response => {
        setGrossesse(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des grossesses:', error);
      });
  }, []);

  useEffect(() => {
    getMedecins()
      .then(response => {
        setMedecins(response);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des medecins:', error);
      });
  }, []);
  return (
    <div className="grid place-items-center h-screen mt-12 ">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400 bg-gray-50">
        <h1 className="text-xl font-bold my-4">Connexion</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <select
              onChange={handleChange}
              value={values.grossesse}
              id="grossesse"
             className="w-full border border-gray-300 p-2 mb-4 rounded" id="grossesse" name="grossesse" >
              <option value="grossesse">Grossesse correspondante:</option>
              {grossesse.map((g) => (
                <optgroup key={g.id} >
                <option  value={g.id}>{g.create_by_id__username+'-'+g.start_date}</option>
                </optgroup>
                ))}
            </select>
          {errors.grossesse && touched.grossesse && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.grossesse}</span>}
          <select
              onChange={handleChange}
              value={values.doctor}
              id="doctor"
             className="w-full border border-gray-300 p-2 mb-4 rounded" id="doctor" name="doctor" >
              <option value="doctor">medecin correspondant:</option>
              {medecins.map((m) => (
                <optgroup key={m.id} >
                <option  value={m.id}>{m.name+'-'+m.profession}</option>
                </optgroup>
                ))}
            </select>
          {errors.doctor && touched.doctor && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.doctor}</span>}

          <input
            onChange={handleChange}
            type="date"
            value={values.date}
            id="date"
            placeholder="date"
          />
          {errors.date && touched.date && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.date}</span>}

          <input
            onChange={handleChange}
            type="time"
            value={values.time}
            id="time"
            placeholder="time"
          />
          {errors.time && touched.time && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.time}</span>}
          <label htmlFor="Me rappeler">Me rappeler</label>
          <input className="flex"
            type="checkbox"
            name="reminder"
            value={values.reminder}
            onChange={handleChange}
            id="reminder"
            placeholder="reminder"
 
          />
          <textarea
          className="b-black"
           name="notes"
           value={values.notes}
           onChange={handleChange}
           id="notes"
           placeholder="notes"
          
          />

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
export default Rendez_vous;
