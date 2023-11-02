"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../Navbar";
import Modal,{ setAppElement } from 'react-modal';


export default function RegisterRdvForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password2, setPassword2] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !email || !password || !first_name || !password2 || !last_name ) {
      setError("All fields are necessary.");
      return;
    }

    try {

      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json'

        },
        body: JSON.stringify({
          username,
          email,
          first_name,
          last_name,
          password,
          password2,
        }),
      });
        if (response.ok) {
            const data = await response.json()
            console.log(data)
            router.push("/");

        }
        else {
            const error = await response.json()
            console.log(error);
            if (response.status === 400) {
                error.value = error
            }
        }
        
    }
    catch (error) {
        console.log(error)
    }
  };
//  const modal(){
  // return(
    // <h1>etes vous sure de vouloir modifier ce rendez-vous?</h1>
  // )
//  }
  return (
    <div>
        <Navbar/>

    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Enregistrer un rendez-vous medical</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Nom du rdv"
          />
          <select onChange={(e) => setEmail(e.target.value)}>
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
            <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email"
          />
          <input
            onChange={(e) => setFirstName(e.target.value)}
            type="number"
            placeholder="Numero de telephone "
          />
          <input
            onChange={(e) => setLastName(e.target.value)}
            type="date"
            placeholder="date"
          />
          
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="time"
            placeholder="heure"
          />
          <label htmlFor="note">note</label>
          <textarea/>
          <div className="flex"> 
          <label htmlFor="Me rappeler">Me rappeler</label>
          <input
            onChange={(e) => setPassword2(e.target.value)}
            type="checkbox"
            placeholder="Me rappeler"
          />
          </div>
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">

            Enregistrer le rdv
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
    </div>
  );
}