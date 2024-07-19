// import LoginForm2 from "@/components/user/LoginForm2";

// export default function Register(){
//     return(
//       <LoginForm2/>
//     );
// } 
// // "use client";
// import type { NextPage } from "next";
// import { useFormik } from "formik";
// import { css } from "@emotion/react";
// import { BeatLoader } from "react-spinners";
// import * as Yup from "yup";
// import { useState } from 'react';
// import { register } from '../../app/services';
// import { useRouter } from "next/navigation";


// const override = css`
//   display: block;
//   margin: 0 auto;
// `;
// // Yup schema to validate the form
// const schema = Yup.object().shape({
//   profil: Yup.string().required(),
//   first_name: Yup.string().required(),
//   last_name: Yup.string().required(),
//   date_naissance: Yup.date().required(),
//   sexe: Yup.string().required(),
//   genre: Yup.string().required(),
//   pays: Yup.string().required(),
//   last_graduation: Yup.string().required(),
//   religion: Yup.string().required(),
//   role_religieux: Yup.string().required(),
//   denomination: Yup.string().required(),
//   username: Yup.string().required(),
//   telephone: Yup.string().required(),
//   email: Yup.string().required().email(),
//   profession: Yup.string().required(),
//   password: Yup.string().required().min(8),
//   password2: Yup.string().required().oneOf([Yup.ref('password')], 'Les mots de passe doivent correspondre.'),
// });


// const Signup: NextPage = () => {
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [editableId, setEditableId] = useState(0);
//   const [step, setStep] = useState(1);
//   const [profil, setProfil] = useState('');

//   const router = useRouter();
//   const handleNext = () =>{
//     switch (step){
//       case 1:
//         if(!profil){
//           setErrorMessage("veuillez selectionner le profil");
//           return;
//         }
//         break;
//       case 2:
//         if(!profil || !profil){
//           setErrorMessage("veuillez remplir tous les champs ");
//           return;
//         }
//     }

//   }

//   const handlePreviousWeek = () => {
    
//     if (editableId > 1) {
//       setEditableId(editableId - 1);
//     }
//   };

//   const handleNextWeek = () => {
//     if (editableId < 41) {
//       setEditableId(editableId + 1);
//     }
//   };

//   // Formik hook to handle the form state
//   const formik = useFormik({
//     initialValues: {
//       profil: "",
//       first_name: "",
//       last_name: "",
//       date_naissance: "",
//       sexe: "",
//       genre: "",
//       pays: "",
//       last_graduation: "",
//       religion: "",
//       role_religieux: "",
//       denomination: "",
//       username: "",
//       telephone: "",
//       email: "",
//       profession: "",
//       password: "",
//       password2: "",
//     },

//     // Pass the Yup schema to validate the form
//     validationSchema: schema,

//     // Handle form submission
//     onSubmit: async ({ profil,first_name,last_name,date_naissance,sexe,genre, pays,last_graduation,religion,role_religieux,denomination,username,telephone,email, profession,password, password2}) => {
//       try {
//         setIsLoading(true); 
//         const response = await register({ profil, first_name,last_name,date_naissance,sexe, genre,pays,last_graduation,religion,role_religieux,denomination,username,telephone,email,profession, password ,password2});
//         if (response) {
//           setSuccessMessage('Inscription réussie !');
//           router.replace("login");
//         } else {
//           setErrorMessage('Erreur lors de l\'inscription.');
//         }
//       } catch (error) {
//         console.error(error);
//         setErrorMessage('Erreur lors de la communication avec le serveur.');
//       } finally {
//         setIsLoading(false); // Désactiver le loader
//       }
//     },
//   });

//   // Destructure the formik object
//   const { errors, touched, values, handleChange, handleSubmit } = formik;

//   return (
//     <div className="grid place-items-center h-screen mb-96 mt-28 ">
//       <div className="w-96 shadow-lg p-5 rounded-lg border-t-4 border-green-400 bg-gray-50">
//         <h1 className="text-xl font-bold my-4">Inscription</h1>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-3" method="POST">
//           {editableId===0?(
//             <>
//              <h1 className="tab1">Personnalite:</h1>
//             <button
//             onChange={handleChange}
//             value={values.profil}
//             className="bg-green-600 text-white font-bold cursor-pointer  px-6 py-2" disabled={isLoading} > 
//               Utilisateur
//             </button>
//             <button 
//             onChange={handleChange}
//             value={values.profil}
//             className=" mt-3 bg-green-600 text-white font-bold cursor-pointer px-6 py-2" disabled={isLoading} > 
//               Personnel de sante
//             </button>
//             </>
//           ):editableId===1?(
//             <>
//             <h1>Informations personnelles:</h1>
//           <input
//             type="text"
//             name="nom"
//             value={values.first_name}
//             onChange={handleChange}
//             id="nom"
//             placeholder="Nom"

//           />
//           {errors.first_name && touched.first_name && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.first_name}</span>}
//           <input
//             type="text"
//             name="prenom"
//             value={values.last_name}
//             onChange={handleChange}
//             id="prenom"
//             placeholder="Prenom"

//           />
//           {errors.last_name && touched.last_name && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.last_name}</span>}
//           <label htmlFor="">Date de naissance</label>
//           <input
//             type="date"
//             name="date_naissance"
//             value={values.date_naissance}
//             onChange={handleChange}
//             id="date_naissance"
//             placeholder="Date de naissance"

//           />
//           {/* {errors.email && touched.date_naissance && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.email}</span>} */}
         
//           <select className="h-12" name="sexe" id="sexe" onChange={handleChange} value={values.sexe}>
//             <option value="">selectionner votre sexe</option>
//             <option value="homme">Homme</option>
//             <option value="femme">Femme</option>
//           </select>
//           {/* {errors.email && touched.email && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.email}</span>} */}

//           <input
//             type="text"
//             name="genre"
//             value={values.genre}
//             onChange={handleChange}
//             id="genre"
//             placeholder="genre"

//           />
//           {/* {errors.email && touched.email && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.email}</span>} */}
//           <select className="h-12" name="pays" id="pays" onChange={handleChange} value={values.pays}>
//             <option value="">pays</option>
//             <option value="Cameroun">Cameroun</option>
//             <option value="gabon">gabon</option>
//             <option value="gabon">gabon</option>
//             <option value="gabon">gabon</option>
//             <option value="gabon">gabon</option>
//             <option value="gabon">gabon</option>
//             <option value="gabon">gabon</option>
//             <option value="gabon">gabon</option>
//             <option value="gabon">gabon</option>
//             <option value="gabon">gabon</option>
//             <option value="gabon">gabon</option>
//             <option value="gabon">gabon</option>
//             <option value="gabon">gabon</option>
//             <option value="gabon">gabon</option>
//             <option value="gabon">gabon</option>
//             <option value="gabon">gabon</option>
//             <option value="gabon">gabon</option>
//           </select>
//           {/* {errors.email && touched.email && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.email}</span>} */}
//           <select className="h-12" name="last_graduation" id="last_graduation" onChange={handleChange} value={values.last_graduation}>
//             <option value="">Dernier Diplome</option>
//             <option value="homme">BAC+1</option>
//             <option value="femme">BAC+2</option>
//             <option value="femme">Licence</option>
//             <option value="femme">Master</option>
//             <option value="femme">Maitrise</option>
//             <option value="femme">doctorat</option>
//             <option value="femme">Autres</option>
           
//           </select>
//           {/* {errors.email && touched.email && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.email}</span>} */}
//           <input
//             type="text"
//             name="religion"
//             value={values.religion}
//             onChange={handleChange}
//             id="religion"
//             placeholder="religion"

//           />
//           {/* {errors.role_religieux && touched.email && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.email}</span>} */}
//           <input
//             type="text"
//             name="role_religieux"
//             value={values.role_religieux}
//             onChange={handleChange}
//             id="role_religieux"
//             placeholder="role religieux"

//           />
//           {/* {errors.denomination && touched.denomination && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.email}</span>} */}

//           <input
//             type="text"
//             name="denomination"
//             value={values.denomination}
//             onChange={handleChange}
//             id="denomination"
//             placeholder="denomination"

//           />
//           {/* {errors.email && touched.email && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.email}</span>}  */}
//             </>

//           ):editableId===2?(
//             <>
//             <h1>Informations du compte:</h1>
//           <input
//             type="text"
//             name="username"
//             value={values.username}
//             onChange={handleChange}
//             id="username"
//             placeholder="Pseudo"

//           />
//           {/* {errors.username && touched.username && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.username}</span>} */}
//           <input
//             type="text"
//             name="telephone"
//             value={values.telephone}
//             onChange={handleChange}
//             id="telephone"
//             placeholder="Telephone"

//           />
//            <input
//             type="email"
//             name="email"
//             value={values.email}
//             onChange={handleChange}
//             id="email"
//             placeholder="email"

//           />
//           {/* {errors.username && touched.username && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.username}</span>} */}
//           <input
//             type="text"
//             name="profession"
//             value={values.profession}
//             onChange={handleChange}
//             id="profession"
//             placeholder="profession"

//           />
//           {/* {errors.username && touched.username && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.username}</span>} */}

//           <input
//             type="password"
//             name="password"
//             value={values.password}
//             onChange={handleChange}
//             id="password"
//             placeholder="Mot de passe"
//           />
//           {/* {errors.password && touched.password && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.password}</span>} */}
//           <input
//             type="password2"
//             name="password2"
//             value={values.password2}
//             onChange={handleChange}
//             id="password2"
//             placeholder="Reecrire le mot de passe"

//           />
//           {/* {errors.password2 && touched.password2 && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.password2}</span>} */}
         
//             </>

//           ):(
//             <>

//           <h1>Forfaits ou dons </h1>
//               <h1>Choisir un forfait</h1>
         
//               <button className=" mt-3 bg-green-600 text-white font-bold cursor-pointer px-6 py-2" disabled={isLoading} > 
//                 Free
//               </button>
//               <button className=" mt-3 bg-green-600 text-white font-bold cursor-pointer px-6 py-2" disabled={isLoading} > 
//                 Basic
//               </button>
//               <button className=" mt-3 bg-green-600 text-white font-bold cursor-pointer px-6 py-2" disabled={isLoading} > 
//                 Pro
//               </button>
//               <button className=" mt-3 bg-green-600 text-white font-bold cursor-pointer px-6 py-2" disabled={isLoading} > 
//                 faire un don
//               </button>

//           <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2" disabled={isLoading} type="submit"> 
//           {isLoading ? (
//             <BeatLoader color={"#ffffff"} loading={isLoading} css={override} size={10} />
//           ) : (
//             "Submit"
//           )}
//           </button>
//             </>
//           )}
//            <div className="flex justify-between mt-4">
//             {editableId===0?(
//               <></>
//             ):(
//               <>
//                   <button onClick={handlePreviousWeek} className="transition duration-500 ease-in-out hover:bg-indigo-900 inline-block bg-green-600 text-lg font-medium rounded-full text-white px-4 py-2 cursor-pointer">
//                   Previous
//                 </button>
//               </>
//             )}
//                 <button onClick={handleNextWeek}  className="transition duration-500 ease-in-out hover:bg-indigo-900 inline-block bg-red-600 text-lg font-medium rounded-full text-white px-4 py-2 cursor-pointer">
//                 Next
//                 </button>
//               </div>
//         </form>
//         {successMessage && <p className="bg-green-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{successMessage}</p>}
//         {errorMessage && <p className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errorMessage}</p>}
//       </div>
//     </div>
//   );
// };

// export default Signup;