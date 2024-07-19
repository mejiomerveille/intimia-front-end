"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import { getGrossesse } from "@/app/services";
import Modal from 'react-modal';
import { CloseIcon } from "stream-chat-react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import Loader from "@/components/register/loader";

const Welcome = () => {
  const router = useRouter();
  const[loading,setLoading]=useState(true);
  const [grossesse, setGrossesse] = useState([]);
  const [selectedGrossesseId, setSelectedGrossesseId] = useState("");
  const [selectedGrossesse, setSelectedGrossesse] = useState("");

  useEffect(() => {
      getGrossesse()
        .then(response => {
          setGrossesse(response.data);
          // console.log(response.data);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des grossesses:', error);
        });
  }, []);

  const handleSelectGrossesse = (grossesse) => {
    localStorage.setItem('selectedGrossesseId', grossesse.id)
    console.log(grossesse.id)
    setSelectedGrossesseId(grossesse.id); 
    setSelectedGrossesse(grossesse.user_id__username+'-'+grossesse.start_date);
    router.replace("/");
  };

  const modifier = async (id:number) => {
    const confirmed = window.confirm('Voulez-vous vraiment modifier ce rendez-vous?');
    if (confirmed) {
    router.replace("/grossesse");
    }
  };

      
useEffect(()=>{
  setTimeout(()=>setLoading(false),1000)
},[]);

if(loading){
  return <Loader/>
}

  return (
    <div className='mt-24'>
        <Modal isOpen={true}
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              zIndex: 1000,
            },
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              // width: '400px',
              maxHeight: '400px',
              overflowY: 'auto',
            },
          }}>
        <div>
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold mb-4">Liste des grossesses</h1>
            {/* <button onClick={() => setModalOpen(false)}> */}
            <CloseIcon />
            {/* </button> */}
          </div>
      <table className="border-collapse w-full">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Date de debut</th>
            <th className="py-2 px-4 border-b">Date de fin</th>
            <th className="py-2 px-4 border-b">Enregistrer par:</th>
            <th className="py-2 px-4 border-b">Proprietaire</th>
            <th className="py-2 px-4 border-b">Actions</th> 
            <th className="py-2 px-4 border-b">Others</th> 
          </tr>
          
        </thead>
        <tbody>
          {grossesse.map((g) => (
            <tr key={g.id}>
              <td className="py-2 px-4 border-b">{g.start_date}</td>
              <td className="py-2 px-4 border-b">{g.end_date}</td>
              <td className="py-2 px-4 border-b">{g.create_by_id__username}</td>
              <td className="py-2 px-4 border-b">{g.user_id__username}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleSelectGrossesse(g)}
                >
                  Sélectionner
                </button>
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => modifier(g.id)} 
                >
                  Modifier
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-8">
        <Link href="/grossesse" className="transition duration-500 ease-in-out hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-4 py-2 cursor-pointer">Ajouter une grossesse</Link>
       </div>
    </div>
  
      </Modal>
    </div>
  );
};

export default Welcome;