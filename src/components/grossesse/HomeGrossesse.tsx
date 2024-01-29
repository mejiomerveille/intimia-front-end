"use client";
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";

import React, { useState, useEffect } from "react";
import axios from "axios"; 

export default function EvolutionGrossesseForm() {
  const [numSemaine, setNumSemaine] = useState(1);
  const [semaineInfo, setSemaineInfo] = useState({});

  useEffect(() => {
    const fetchSemaineInfo = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/grossesse/semaine/${numSemaine}`);
        setSemaineInfo(response.data);
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
    if (numSemaine < 42) {
      setNumSemaine(numSemaine + 1);
    }
  };

  const openNewPage = (couleur, texte) => {
    const newPage = window.open("", "_blank");
    newPage.document.body.style.backgroundColor = couleur;
    newPage.document.body.innerHTML = `<h1>${texte}</h1>`;
  };

  
  return (
    <div className="bg-pink-100 mt-20">
      
      <div>
        <h1 className="mb-3">Semaine actuelle</h1>
        <h3 className="mb-3">Periode obstetrique</h3>
        <input type="hidden" name="start_week" value="{{ start_week }}" />
        <div className="border-double border-4 border-indigo-600 w-20 mb-3 h-20 ">{numSemaine}eme semaine</div>
      </div>

      <section className="text-center mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <>
              <div>
                <h1 className="text-xl">photo de bébé</h1>
                <div className="mx-auto" style={{ width: "220px", height: "420px" }}>
                  <img src={`http://localhost:8000//media/media/images/${semaineInfo.photoBebe}`}  alt="photo" />
                </div>
              </div>
              <div>
                <h1 className="text-xl">illustration réelle</h1>
                <div className="mx-auto" style={{ width: "220px", height: "220px" }}>
                  <img src={`http://localhost:8000//media/media/images/${semaineInfo.illustrationReelle}`}  alt="photo" />
                </div>
              </div>
              <div>
                <h1 className="text-xl">photo du ventre de la mère</h1>
                <div className="mx-auto" style={{ width: "220px", height: "220px" }}>
                  <img src={`http://localhost:8000//media/media/images/${semaineInfo.photoVentreMere}`} alt="photo" />
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
      </section>
 
      <div className="instruction">
            <div className="card text-white bg-success " >
                <div className="card-header">
                    <h1>Exercice de Kegel</h1>
                </div>
                <div className="card-body">
                    <h2 className="card-title">une serie d'exercice pour renforcer les muscles pelviens</h2>
                    <h5 className="card-text"><button type="submit">Lancer</button></h5>
                </div>
            </div>
            <div className="card text-white bg-red-600 mb-3" >
                <div className="card-header">
                    <h1>A propos du bebe</h1>
                </div>
                <div className="card-body">
                    <h2 className="card-title">Embryon</h2>
                    <h5 className="card-text">Some quick example text to build on the card title and make up the bulk of the card's
                        content.</h5>
                </div>
            </div>
            <div className="card text-dark bg-warning mb-3" >
                <div className="card-header">
                    <h1>A propos de vous</h1>
                </div>
                <div className="card-body">
                    <h2 className="card-title">Maman</h2>
                    <h5 className="card-text">Est-ce que vous savez que lorsque vous vous rendez chez le medecin et que vous pensez etre
                        enceinte de 5 ou 6 semaines , vous etes en realite ...</h5>
                </div>
            </div>
            <div className="card text-dark bg-info mb-3" >
                <div className="card-header">
                    <h1>Nutrition</h1>
                </div>
                <div className="card-body">
                    <h2 className="card-title">Danger card title</h2>
                    <h5 className="card-text">Cette premiere semaine est le point de depart. Pendant cette periode,vous devez adopter un
                        regime alimentaire permettant d'assurer les meilleurs...</h5>
                </div>
            </div>
            <div className="card text-dark bg-orange-600 mb-3">
                <div className="card-header">
                    <h1>Recommande</h1>
                </div>
                <div className="card-body">
                    <h2 className="card-title">Conseil recommande</h2>
                    <h5 className="card-text">Some quick example text to build on the card title and make up the bulk of the card's
                        content.</h5>
                </div>
            </div>
        </div>
 

    </div>
        
    );
}