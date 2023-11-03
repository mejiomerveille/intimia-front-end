"use client";
import Link from "next/link";
import { getCsrfToken } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal,{ setAppElement } from 'react-modal';
import { registerGrossesse } from "@/app/services";



export default function InfoGrossesseForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchCsrfToken() {
      const token = await getCsrfToken();
      setCsrfToken(token);
    }

    fetchCsrfToken();
  }, []);

  const customStyles = {
    overlay: {
       backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    content: {
       top: '50%',
       left: '50%',
       right: 'auto',
       bottom: 'auto',
       marginRight: '-50%',
       transform: 'translate(-50%, -50%)'
    }
 }
//  const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
//   event.preventDefault();

//   fetch("http://127.0.0.1:8000/api1/regis-grossesse/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "csrf-token": csrfToken,
//     },
//     body: JSON.stringify({ start_date: startDate }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       router.replace("grossesse/evolution");
//     })
//     .catch((error) => {
//       console.error("Une erreur s'est produite:", error);
//     });
// };

const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  try {    
    const result = await registerGrossesse({ start_date: startDate })
    if(result.status==200 || result.status==201){
      console.log(result);
      setTimeout(() => {
        router.replace("grossesse/evolution");
      }, 10000);
    }
    else{
      console.log(result)
    }
  } catch (error) {
    console.log(error);
    
  }
}


  return (
    <div className="p-4 bg-pink-100">
      <div className="flex items-center mb-1">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
        <Link className="text-sm mt-3 text-right" href={"dashboard"}>
        <span className="material-icons mr-2 text-gray-600 text-2xl">arrow_back</span>
        </Link>
        <h1 className="text-2xl font-bold">Mode Grossesse</h1>
      </div>
      <h2 className="text-xl font-bold mb-4">Pourquoi enregistrer votre grossesse sur Intimia ?</h2>
      <div className="mb-4">
        <div className="mb-2">
          Voir le compte à rebours jusqu'à la naissance du bébé
        </div>
        <div className="mb-2">
          Recevez chaque jour des conseils santé et des informations sur le développement de votre bébé.
        </div>
        <div className="mb-2">
          Suivre le poids, la nutrition et les autres paramètres relatifs au mode de vie
        </div>
      </div>
      <button onClick={() => setIsOpen(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Enregistrer la grossesse
      </button>

      <Modal ariaHideApp={false} isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
      <div className="p-4 bg-blue-400">
        <div>
        <h2 className="text-2xl font-bold mb-4">Enregistrer la date de début de grossesse</h2>
        <span className="material-icons mr-2 text-black-600 float-right cursor-pointer" onClick={() => setIsOpen(false)}>close</span>
        </div>
      <form onSubmit={handleSubmit}  className="mb-4">
      <input type="hidden" name="csrfToken" value={csrfToken==undefined?'':String(csrfToken)} /> 
        <div className="mb-4">
          <label htmlFor="start-date" className="text-lg font-semibold block mb-2">Date de début :</label>
          <input
            type="date"
            id="start-date"
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
            value={startDate}
            required
          />
        </div>
        <div className="flex justify-between">
          <button  type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Enregistrer
          </button>
          <div>
            <button  className="text-purple-500 hover:text-purple-700 font-semibold mr-2">
              Modifier
            </button>
            <button className="text-red-500 hover:text-red-700 font-semibold">
              Supprimer
            </button>
          </div>
        </div>
      </form>
    </div>
      </Modal>
    </div>

  );
}