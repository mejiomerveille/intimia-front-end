"use client";
import type { NextPage } from "next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerrdv } from '../../app/services';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { css } from "@emotion/react";
import { BeatLoader } from "react-spinners";


const override = css`
  display: block;
  margin: 0 auto;
`;


// Yup schema to validate the form
const schema = Yup.object().shape({
  name: Yup.string().required(),
  profession: Yup.string().required(),
  email: Yup.string().required().email(),
  date: Yup.string().required(),
  time: Yup.string().required(),
  weight: Yup.string(),
  reminder: Yup.string(),
  notes: Yup.string(),

});

const RegisterRdvForm: NextPage = () =>{
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Formik hook to handle the form state
  const formik = useFormik({
    initialValues: {
      name: "",
      profession: "",
      email: "",
      date: "",
      time: "",
      weight: "",
      reminder: "",
      notes: "",
    },

    // Pass the Yup schema to validate the form
    validationSchema: schema,

    onSubmit: async ({ name,profession,email, date, time, weight,reminder,notes}) => {
      try {
        const response = await registerrdv({ name, profession,email, date, time ,weight,reminder,notes});
        setIsLoading(true); 
        if (response) {
          setSuccessMessage('Enregistrement réussie !');
          router.replace("rdv/rdv-list");
        } else {
          setErrorMessage('Erreur de l\'enregistrement.');
        }
      } catch (error) {
        console.error(error);
        setErrorMessage('Erreur lors de la communication avec le serveur.');
      }finally {
        setIsLoading(false); // Désactiver le loader
      }
    },
  });

  // Destructure the formik object
  const { errors, touched, values, handleChange, handleSubmit } = formik;


    
  return (
    <div className="border-blue-400 mt-16">
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400 bg-gray-50">
        <h1 className="text-xl font-bold my-4">Enregistrer un rendez-vous medical</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            id="name"
            placeholder="name"
          />
          {errors.name && touched.name && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.name}</span>}

          <select onChange={handleChange}
            name="profession"
            value={values.profession}
            id="profession"
            >
            <option value="">Sélectionnez le medecin</option>
            <option value="Gynecologue">Gynecologue</option>
            <option value="Visiteur medical">Visiteur medical</option>
            <option value="Sage-femme">Sage-femme</option>
            <option value="Infirmiere">Infirmiere</option>
            <option value="Obstetricien">Obstetricien</option>
            <option value="Autre">Autre</option>
            <option value="Pediatre">Pediatre</option>
            <option value="Kinesitherapeute">Kinesitherapeute</option>
            <option value="Echographiste">Echographiste</option>
          </select>
          {errors.profession && touched.profession && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.profession}</span>}

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
             type="date"
             name="date"
             value={values.date}
             onChange={handleChange}
             id="date"
             placeholder="date"
             />
           {errors.date && touched.date && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.date}</span>}
          <input
             type="time"
             name="time"
             value={values.time}
             onChange={handleChange}
             id="time"
             placeholder="time"
             />
           {errors.time && touched.time && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.time}</span>}
           
          <input
             type="weight"
             name="weight"
             value={values.weight}
             onChange={handleChange}
             id="weight"
             placeholder="weight"
             />
           {errors.email && touched.email && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.email}</span>}
          {/* <label htmlFor="note">note</label> */}
          <textarea
          className="b-black"
           name="notes"
           value={values.notes}
           onChange={handleChange}
           id="notes"
           placeholder="notes"
          
          />
          <div className="flex"> 
          <label htmlFor="Me rappeler">Me rappeler</label>
          <input className="flex"
            type="checkbox"
            name="reminder"
            value={values.reminder}
            onChange={handleChange}
            id="reminder"
            placeholder="reminder"
 
          />
          </div>
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
          {isLoading ? (
            <BeatLoader color={"#ffffff"} loading={isLoading} css={override} size={10} />
          ) : (
            "Enregistrer le rdv"
          )}
          </button>
        </form>
        {successMessage && <p className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{successMessage}</p>}
        {errorMessage && <p className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errorMessage}</p>}
      </div>
    </div>
    </div>
  );
}
export default RegisterRdvForm;
