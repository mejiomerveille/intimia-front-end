"use client";
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { BASE_URL, BASE_URL_MEDIAS } from "@/app/services";
import Modal from 'react-modal';

export default function Essai(){
  const [numSemaine, setNumSemaine] = useState(3);
  const [semaineInfo, setSemaineInfo] = useState({});

  useEffect(() => {
    const fetchSemaineInfo = async () => {
      try {
        const response = await axios.get(`${BASE_URL}grossesse/semaine/${numSemaine}`);
        setSemaineInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSemaineInfo();
  }, [numSemaine]);

  const handlePreviousWeek = () => {
    
    if (numSemaine > 3) {
      setNumSemaine(numSemaine - 1);
    }
  };

  const handleNextWeek = () => {
    if (numSemaine < 39) {
      setNumSemaine(numSemaine + 1);
    }
  };

  return(
<div className="bg-black-1500">
<Modal isOpen={true}  style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
            },
            content: {
              top: '55%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
            },
          }}
        >
         
          <div>
        <input type="hidden" name="start_week" value="{{ start_week }}" />
        <div className="border-double border-4 border-indigo-600 w-20 mb-3 h-20 ">{numSemaine}eme semaine</div>
      </div>

      <section className="text-center mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
            <>
              <div>
                <h1 className="text-xl">images en 2D</h1>
                <div className="mx-auto" style={{ width: "220px", height: "420px" }}>
                  <img src={`${BASE_URL_MEDIAS}/${semaineInfo.im3D}`}  alt="Pas d'images disponibles" />
                </div>
              </div>
              <div>
                <h1 className="text-xl">images en 3D</h1>
                <div className="mx-auto" style={{ width: "220px", height: "220px" }}>
                  <img src={`${BASE_URL_MEDIAS}/${semaineInfo.im2D}`}  alt="Pas d'images disponibles" />
                </div>
              </div>
              
            </>
        </div>
        <div className="fixed top-0 h-full w-full flex justify-between items-center text-black px-10 text-3xl">
          <button onClick={handlePreviousWeek} >
            <BsFillArrowLeftCircleFill className="bg-white" />
          </button>
          <button onClick={handleNextWeek}>
            <BsFillArrowRightCircleFill className="bg-white"/>
          </button>
        </div>
      </section>
      </Modal>
 
</div>    
  )
}