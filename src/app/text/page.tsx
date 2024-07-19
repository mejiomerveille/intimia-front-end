"use client";
import { css } from "@emotion/react";
import { BeatLoader } from "react-spinners";
import { useState } from 'react';
import { register } from '../../app/services';
import { useRouter } from "next/navigation";
import Forfaits from "@/components/acceuil/forfait";


const override = css`
  display: block;
  margin: 0 auto;
`;

const Signup = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editableId, setEditableId] = useState(0);
  const [step, setStep] = useState(1);
  const [profil, setProfil] = useState('');
  const [first_name, setfirst_name] = useState('');
  const [last_name, setlast_name] = useState('');
  const [date_naissance, setdate_naissance] = useState('');
  const [sexe, setsexe] = useState('');
  const [genre, setgenre] = useState('');
  const [pays, setpays] = useState('');
  const [last_graduation, setlast_graduation] = useState('');
  const [religion, setreligion] = useState('');
  const [role_religieux, setrole_religieux] = useState('');
  const [denomination, setdenomination] = useState('');
  const [username, setusername] = useState('');
  const [telephone, settelephone] = useState('');
  const [email, setemail] = useState('');
  const [profession, setprofession] = useState('');
  const [password, setpassword] = useState('');
  const [password2, setpassword2] = useState('');

  const router = useRouter();
  const handleNext = () =>{
    switch (step){
      case 1:
        setErrorMessage("");
        break;
      case 2:
        // if(!first_name || !last_name|| !date_naissance|| !sexe|| !genre|| !pays|| !last_graduation|| !religion || !role_religieux|| !denomination){
        //   setErrorMessage("veuillez remplir tous les champs ");
        //   return;
        // }
        // setErrorMessage("");
        break;
      case 3:
        // if(!username || !telephone|| !email|| !profession|| !password|| !password2 && password.length > 8 &&password!=password2){
        //   setErrorMessage("veuillez remplir tous les champs ");
        //   setErrorMessage("le mot de passe doit contenir au moins 8 caracteres");
        //   setErrorMessage("les deux mots de passe doivent etre identiques ");
        //   return;
        // }
        break;
    }
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
    }

  const handleProfil = (profils) => {
    setProfil(profils)
    setStep((prevStep) => prevStep + 1);
    }

const handleSubmit = async()=>{
  const data={
    username:username,
    email:email,
    password:password,
    password2:password2,
    first_name:first_name,
    last_name:last_name,
    profil:profil,
    date_naissance:date_naissance,
    sexe:sexe,
    genre:genre,
    pays:pays,
    last_graduation:last_graduation,
    religion:religion,
    role_religieux:role_religieux,
    denomination:denomination,
    telephone:telephone,
    profession:profession,
  }
  console.log(data)
      try {
        setIsLoading(true); 
        const response = await register({data});
        if (response) {
          console.log(response)
          setSuccessMessage('Inscription réussie !');
          router.replace("login");
        } else {
          setErrorMessage('Erreur lors de l\'inscription.');
        }
      } catch (error) {
        console.error(error);
        setErrorMessage('Erreur lors de la communication avec le serveur.');
      } finally {
        setIsLoading(false); 
      }
    };

  return (
    <div className="mt-20 ">
        <h1 className="text-2xl font-bold my-4">Formulaire d'Inscription:</h1>
        <div className="flex justify-around h-9 mb-5">
          <div className="flex justify-around"><span className={step===1?'active w-8 text-center':'bg-gray-500 w-8 text-center'}>1</span><p className="bg-white w-64 text-center">Profil</p></div>
          <div className="flex justify-around"><span className={step===2?'active w-8 text-center':'bg-gray-500 w-8 text-center'}>2</span><p className="bg-white w-64 text-center">Informations personnelles</p></div>
          <div className="flex justify-around"><span className={step===3?'active w-8 text-center':'bg-gray-500 w-8 text-center'}>3</span><p className="bg-white w-64 text-center">Informations du compte</p></div>
          <div className="flex justify-around"><span className={step===4?'active w-8 text-center':'bg-gray-500 w-8 text-center'}>4</span><p className="bg-white w-64 text-center">les Forfaits</p></div>
        </div>
    <div className="grid place-items-center h-auto mb-5 align-middle">
      <div className="we shadow-lg p-5 rounded-lg border-t-4 border-green-400 bg-white">

        <form onSubmit={handleSubmit} method="POST">
          {step===1?(
            <>
              <h1 className="text-xl font-bold text-black mb-10">Veuillez choisir votre profil:</h1>
              <div className="input-container">
                <span className="input-label">nom</span>
                <input className="outlin: none border-red-500 bg-transparent border-dashed border-2" type="text" />
              </div>
              <div className="flex justify-between mt-4">
                <button type="button" onClick={()=>handleProfil('Utilisateur')} className={profil==='Utilisateur' ? 'actif rounded-full bg-green-600 text-white font-bold cursor-pointer  px-6 py-2':'bg-green-600 text-white font-bold cursor-pointer  px-6 py-2 rounded-full  h-44'}> Utilisateur</button>
                <button type="button" onClick={()=>handleProfil('Personnel de sante')} className={profil==='Personnel de sante' ? 'actif rounded-full bg-green-600 text-white font-bold cursor-pointer  px-6 py-2' :'bg-green-600 text-white font-bold cursor-pointer rounded-full h-44 px-6 py-2'}>Personnel de sante</button>
              </div>
            </>
          ):step===2?(
          <>
            <h1 className="text-xl font-bold text-black mb-10">Informations personnelles:</h1>
            <div className="flex justify-between mb-5">
              <input type="text" name="nom" value={first_name} onChange={(e)=>setfirst_name(e.target.value)} id="nom" placeholder="Nom"/>
              <input type="text" name="prenom" value={last_name} onChange={(e)=>setlast_name(e.target.value)} id="prenom" placeholder="Prenom"/>
            </div>
            <div className="flex justify-between mb-5">
              <label htmlFor="">Date de naissance</label>
              <input type="date" name="date_naissance" value={date_naissance} onChange={(e)=>setdate_naissance(e.target.value)} id="date_naissance" placeholder="Date de naissance"/>
              <select className="h-12" name="sexe" id="sexe" onChange={(e)=>setsexe(e.target.value)}  value={sexe}>
                <option value="">selectionner votre sexe</option>
                <option value="homme">Homme</option>
                <option value="femme">Femme</option>
              </select>
           </div>
            <div className="flex justify-between mb-5">
              <input type="text" name="genre" value={genre} onChange={(e)=>setgenre(e.target.value)} id="genre" placeholder="genre"/>
              <select className="h-12" name="pays" id="pays" onChange={(e)=>setpays(e.target.value)} value={pays}>
                <option value="">pays</option>
                <option value="Cameroun">Cameroun</option>
                <option value="gabon">gabon</option>
                <option value="gabon">gabon</option>
                <option value="gabon">gabon</option>
                <option value="gabon">gabon</option>
                <option value="gabon">gabon</option>
                <option value="gabon">gabon</option>
                <option value="gabon">gabon</option>
                <option value="gabon">gabon</option>
                <option value="gabon">gabon</option>
                <option value="gabon">gabon</option>
                <option value="gabon">gabon</option>
                <option value="gabon">gabon</option>
                <option value="gabon">gabon</option>
                <option value="gabon">gabon</option>
                <option value="gabon">gabon</option>
                <option value="gabon">gabon</option>
              </select>
            </div>
            <div className="flex justify-between mb-5">
              <select className="h-12" name="last_graduation" id="last_graduation" onChange={(e)=>setlast_graduation(e.target.value)} value={last_graduation}>
                <option value="">Dernier Diplome</option>
                <option value="homme">BAC+1</option>
                <option value="femme">BAC+2</option>
                <option value="femme">Licence</option>
                <option value="femme">Master</option>
                <option value="femme">Maitrise</option>
                <option value="femme">doctorat</option>
                <option value="femme">Autres</option>
              </select>
              <input type="text" name="religion" value={religion} onChange={(e)=>setreligion(e.target.value)} id="religion" placeholder="religion"/>
            </div>
            <div className="flex justify-between mb-5">
              <input type="text" name="role_religieux" value={role_religieux} onChange={(e)=>setrole_religieux(e.target.value)} id="role_religieux" placeholder="role religieux"/>
              <input type="text" name="denomination" value={denomination} onChange={(e)=>setdenomination(e.target.value)} id="denomination" placeholder="denomination"/>
            </div>
          </>

          ):step===3?(
            <>
              <h1 className="text-xl font-bold text-black mb-10">Informations du compte:</h1>
              <div className="flex justify-between mb-5">
                <input type="text" name="username" value={username} onChange={(e)=>setusername(e.target.value)} id="username" placeholder="Pseudo"/>
                <input type="text" name="telephone" value={telephone} onChange={(e)=>settelephone(e.target.value)} id="telephone" placeholder="Telephone"/>
              </div>
              <div className="flex justify-between mb-5">
                <input type="email" name="email" value={email} onChange={(e)=>setemail(e.target.value)} id="email" placeholder="email"/>
                <input type="text" name="profession" value={profession} onChange={(e)=>setprofession(e.target.value)} id="profession" placeholder="profession"/>
              </div>
              <div className="flex justify-between mb-5">
                <input type="password" name="password" value={password} onChange={(e)=>setpassword(e.target.value)} id="password" placeholder="Mot de passe"/>
                <input type="password2" name="password2" value={password2} onChange={(e)=>setpassword2(e.target.value)} id="password2" placeholder="Reecrire le mot de passe"/>
              </div>
              </>
          ):(
            <>
              <Forfaits/>
              <button type="button" className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2" disabled={isLoading} > Devenez un acteur cle du projet en faisant un don</button>
            </>
          )}
          <div className="flex justify-between mt-4">
              {step > 1 && <button type="button" onClick={handlePrevious} className="transition duration-500 ease-in-out hover:bg-indigo-900 inline-block bg-green-600 text-lg font-medium rounded-full text-white px-4 py-2 cursor-pointer">Previous</button>}
            {step <4 && step>1 && <button type="button" onClick={handleNext}  className="transition duration-500 ease-in-out hover:bg-indigo-900 inline-block bg-red-600 text-lg font-medium rounded-full text-white px-4 py-2 cursor-pointer">Next</button>}
          </div>
        </form>
        {successMessage && <p className="bg-green-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{successMessage}</p>}
        {errorMessage && <p className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errorMessage}</p>}
      </div>
    </div>
    </div>
  );
};

export default Signup;