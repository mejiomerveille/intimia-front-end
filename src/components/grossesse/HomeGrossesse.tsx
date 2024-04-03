"use client";
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { BASE_URL_MEDIAS,BASE_URL ,currentWeek} from "@/app/services";

export default function EvolutionGrossesseForm() {
  const [numSemaine, setNumSemaine] = useState(1);
  const [semaineInfo, setSemaineInfo] = useState({});

  useEffect(() => {
    currentWeek()
      .then(response => {
        setNumSemaine(response.start_week);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération de semaine:', error);
      });
  }, []);

  // useEffect(() => {
  //   getSemaine()
  //     .then(response => {
  //       setSemaineInfo(response.data);
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Erreur lors de la récupération des grossesses:', error);
  //     });
  // }, [numSemaine]);

  useEffect(() => {
    const fetchSemaineInfo = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/grossesse/semaine/${numSemaine}`);
        setSemaineInfo(response.data);
        // console.log(response.data.Votre_bebe)
      } catch (error) {
        console.error(error);
      }
    };

    fetchSemaineInfo();
  }, [numSemaine]);

  const handlePreviousWeek = () => {
    
    if (numSemaine > 1) {
      setNumSemaine(numSemaine - 1);
    }
  };

  const handleNextWeek = () => {
    if (numSemaine < 41) {
      setNumSemaine(numSemaine + 1);
    }
  };

  
  return (
    <div className=" mt-24">
      
      <div>
        <h1 className="mb-3">Semaine actuelle</h1>
        <input type="hidden" name="start_week" value="{{ start_week }}" />
        <div className="border-double border-4 border-indigo-600 w-20  h-20 ">{numSemaine}eme semaine</div>
      </div>

      <section className="text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            <>
              <div>
                <h1 className="text-xl">photo de bébé</h1>
                <div className="mx-auto" style={{ width: "220px", height: "420px" }}>
                  <img src={`${BASE_URL_MEDIAS}/${semaineInfo.photoBebe}`}  alt="photo" />
                  {/* <h3>Vous etes a la {numSemaine} semaines</h3>
                  <h3>plus que {41-numSemaine} semaines</h3> */}
                </div>
              </div>
              <div>
                <h1 className="text-xl">illustration réelle</h1>
                <div className="mx-auto" style={{ width: "220px", height: "220px" }}>
                  <img src={`${BASE_URL_MEDIAS}/${semaineInfo.illustrationReelle}`}  alt="photo" />
                </div>
              </div>      
              <div>
                <h1 className="text-xl">photo du ventre de la mère</h1>
                <div className="mx-auto" style={{ width: "220px", height: "220px" }}>
                  <img src={`${BASE_URL_MEDIAS}/${semaineInfo.photoVentreMere}`} alt="photo" />
                </div>
              </div>
            </> 
        </div>
        <div className="fixed top-0 h-full w-full flex justify-between items-center text-black px-10 text-3xl">
          <button onClick={handlePreviousWeek} >
            <BsFillArrowLeftCircleFill />
          </button>
          <button onClick={handleNextWeek}>
            <BsFillArrowRightCircleFill />
          </button>
        </div>
 
      <div className="instruction ">
            <div className="card text-dark mb-96" >
                <div className="card-body">
                  {semaineInfo.Votre_bebe !=undefined?(  
                    <>
                    <h2 className="card-title">Votre bebe</h2>
                    <h5 className="card-text">{semaineInfo.Votre_bebe}</h5>
                    </> 
                  ):(
                    <div></div>
                  )}
                </div>
                <div className="card-body">
                    <h2 className="card-title">Votre corps</h2>
                    <h5 className="card-text">{semaineInfo.Votre_corps}</h5>
                </div>
                <div className="card-body">
                    <h2 className="card-title">Sante et conseils</h2>
                    <h5 className="card-text">{semaineInfo.conseils}</h5>
                </div>
                <div className="card-body">
                    <h2 className="card-title">Info pour le partenaire</h2>
                    <h5 className="card-text">{semaineInfo.Info}</h5>
                </div>
                <div className="card-body">
                {semaineInfo.Infojumeaux !=undefined?(  
                    <>
                    <h2 className="card-title">Info jumeaux/ Naissances multiples</h2>
                    <h5 className="card-text">{semaineInfo.Infojumeaux}</h5>
                    </> 
                  ):(
                    <div></div>
                  )}
                </div>
            </div>
        </div>
        </section>
 

    </div>
        
    );
}