"use client";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { updaterdv,getGrossesse,getMedecins,getrdvdetail} from "@/app/services";
import { css } from "@emotion/react";    
import { BeatLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
`;

const Update = () => {
  const [rdv, setRdv] = useState('{}');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [grossesse, setGrossesse] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [ide, setId] = useState('');
  const [ide1, setId1] = useState();

  useEffect(() => {
    getrdvdetail()
      .then(response => {
        setRdv(response.data);
        setId1(response.data.id)
        // console.log(response.data);
        // console.log(response.data.id);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des grossesses:', error);
      });
  }, []);

    

  // const [medecins, setMedecins] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const handleSubmit= async(e)=>{
    e.preventDefault();
    const updaterdvs ={
      ...rdv,
      grossesse:event.target.grossesse.value,
      doctor:event.target.doctor.value,
      date:event.target.date.value,
      time:event.target.time.value,
      reminder:event.target.reminder.value,
      notes:event.target.notes.value,
  };
      try{
        const response = await updaterdv(ide1,updaterdvs);
        alert('rdv modifier avec success!');
        router.replace('/rdv/rdv-list');
      }catch(error){
        console.log(error)
        alert('echec de la modification du rdv!');
      }
    }

useEffect(() => {
  getMedecins()
    .then(response => {
      setDoctor(response);
      const ul=localStorage.getItem('identifiant')
      if (ul != null){
          setId(ul)
      }
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des medecins:', error);
    });
}, []);

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

   if (!isLoading) {
    return <div>Loading...</div>;
  }

  if (!rdv) {
    return <div>Rendez-vous introuvable</div>;
  }
 
    return (
    <div className="grid place-items-center h-screen mt-12 ">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-red-400 bg-gray-50">
        <h1 className="text-xl font-bold my-4">Update RDV</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <select
              // onChange={(e)=>setGrossesse(e.target.value)}
              // value={rdv.grossesse}
              defaultValue={rdv.grossesse_id}
             className="w-full border border-gray-300 p-2 mb-4 rounded" id="grossesse" name="grossesse" >
              {/* <option value={rdv.grossesse_id}>{rdv.grossesse}</option> */}
              {grossesse.map((g) => (
                  <optgroup key={g.id} >
                    <option  value={g.id}>{g.create_by_id__username+'-'+g.start_date}</option>
                </optgroup>
                ))}
            </select>
          <select
              // onChange={(e)=>setDoctor(e.target.value)}
              // value={rdv.doctor}
              defaultValue={rdv.doctor_id}
              id="doctor"
             className="w-full border border-gray-300 p-2 mb-4 rounded" name="doctor" >
              {/* <option value={rdv.doctor_id}>{rdv.doctor}</option> */}
              {doctor.map((m) => (
                <optgroup key={m.id} >
                <option  value={m.id} selected={m.id==rdv.doctor_id}>{m.name+'-'+m.profession}</option>
                </optgroup>
                ))}
            </select>

          <input
            // onChange={handleChange}
            type="date"
            // value={rdv.date}
            defaultValue={rdv.date}
            id="date"
            placeholder="date"
            />

          <input
            // onChange={handleChange}
            type="time"
            // value={rdv.time}
            defaultValue={rdv.time}
            id="time"
            placeholder="time"
          />
          <label htmlFor="Me rappeler">Me rappeler</label>
          <input className="flex"
            type="checkbox"
            name="reminder"
            defaultValue={rdv.reminder}
            // value={rdv.reminder}
            // onChange={handleChange}
            id="reminder"
            placeholder="reminder"
            />
          <textarea
          className="b-black"
          name="notes"
          // value={rdv.notes}
          defaultValue={rdv.notes}
          // onChange={handleChange}
           id="notes"
           placeholder="notes"
          
          />

          <button className="bg-red-600 text-white font-bold cursor-pointer px-6 py-2">
            Update
          </button>
        </form>
        {successMessage && <p className="bg-green-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{successMessage}</p>}
        {errorMessage && <p className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errorMessage}</p>}
      </div>
    </div>
  );
}
export default Update;