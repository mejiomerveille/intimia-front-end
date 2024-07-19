"use client";
import React, { useState, useEffect } from "react";
import { BASE_URL_MEDIAS,currentWeek,getSemaine} from "@/app/services";
import Collapse from 'react-collapse';


function App() {
  const [numSemaine, setNumSemaine] = useState(1);
  const [semaineInfo, setSemaineInfo] = useState({});
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isCollapsed1, setIsCollapsed1] = useState(false);
  const [isCollapsed2, setIsCollapsed2] = useState(false);
  const [isCollapsed3, setIsCollapsed3] = useState(false);
  const [isCollapsed4, setIsCollapsed4] = useState(false);
 
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const toggleCollapse1 = () => {
    setIsCollapsed1(!isCollapsed1);
  };
  const toggleCollapse2 = () => {
    setIsCollapsed2(!isCollapsed2);
  };
  const toggleCollapse3 = () => {
    setIsCollapsed3(!isCollapsed3);
  };
  const toggleCollapse4 = () => {
    setIsCollapsed4(!isCollapsed4);
  };

  useEffect(() => {
    currentWeek()
      .then(response => {
        setNumSemaine(response.start_week);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération de semaine:', error);
      });
  }, []);

  useEffect(() => {
    getSemaine(numSemaine)
      .then(response => {
        setSemaineInfo(response);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des grossesses:', error);
      });
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
    <div className="p-8 mt-20">
      <div className="flex justify-between mb-8">
        <button onClick={handlePreviousWeek} className="bg-gray-700 px-4 py-2 rounded-md text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
          </svg>
        </button>
        <p className="text-2xl font-bold">Semaine actuelle</p>
        <div className="flex gap-4">
          <button className="bg-gray-700 px-4 py-2 rounded-md text-white">{numSemaine}eme semaine</button>
          <button onClick={handleNextWeek} className="bg-gray-700 px-4 py-2 rounded-md text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793l-2.147-2.146a.5.5 0 0 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 1 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1-.5-.5z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="flex flex-col items-center">
        <div className="relative"> 
  <img src={`${BASE_URL_MEDIAS}/${semaineInfo.illustrationReelle}`}  alt="Pear 2" className="w-56 h-56 rounded-full" />
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white">
    {/* <p className="text-sm"><span className="text-xl">Taille du foetus</span><br /> Comme une canelle molue</p> */}
  </div>
    <p className="text-sm">longueur: 50-51Cm <br /> poids: 3-3,2Kg</p>
</div>
        </div>
        <div className="flex flex-col items-center">
          <img src={`${BASE_URL_MEDIAS}/${semaineInfo.photoBebe}`}     alt="Pear 3" className="w-96 h-96 rounded-full" />
          <p className="text-sm mt-2">Votre<br /> bebe</p>
        </div>
        <div className="flex flex-col items-center">
          <img src={`${BASE_URL_MEDIAS}/${semaineInfo.photoVentreMere}`} alt="Orange" className="w-56 h-56 rounded-full" />
          <p className="text-sm mt-2">Votre ventre <br /> a la 41 eme semaine</p>
        </div>
      </div>
      <div >
        {semaineInfo.Votre_bebe !=undefined?(  
          <>
            <h2>
              <button
                type="button"
                className="bg-purple-600 flex items-center justify-between w-full p-5 font-medium rtl:text-right text-black border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                onClick={toggleCollapse} >
                <span>Votre bebe</span>
                <svg className={`w-3 h-3 rotate-180 shrink-0 ${isCollapsed ? 'rotate-0' : 'rotate-180' }`} viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg"  fill="none">
                  <path  stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                </svg>
              </button>
            </h2>
            <Collapse isOpened={isCollapsed}>
                <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                  <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-black border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-open-body-1" aria-expanded="true" aria-controls="accordion-open-body-1">
                    <span className="flex items-center"><svg className="w-5 h-5 me-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg> {semaineInfo.Votre_bebe}</span>
                  </button>
                </div>
              </Collapse>
          </> 
        ):(
          <div></div>
        )}

{semaineInfo.Votre_corps !=undefined?(  
          <>
            <h2>
              <button
                type="button"
                className="bg-purple-600 flex items-center justify-between w-full p-5 font-medium rtl:text-right text-black border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                onClick={toggleCollapse1} >
                <span>Votre corps</span>
                <svg className={`w-3 h-3 rotate-180 shrink-0 ${isCollapsed ? 'rotate-0' : 'rotate-180' }`} viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg"  fill="none">
                  <path  stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                </svg>
              </button>
            </h2>
            <Collapse isOpened={isCollapsed1}>
                <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                  <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-black border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-open-body-1" aria-expanded="true" aria-controls="accordion-open-body-1">
                    <span className="flex items-center"><svg className="w-5 h-5 me-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg> {semaineInfo.Votre_corps}</span>
                  </button>
                </div>
              </Collapse>
          </> 
        ):(
          <div></div>
        )}

{semaineInfo.conseils !=undefined?(  
          <>
            <h2>
              <button
                type="button"
                className="bg-purple-600 flex items-center justify-between w-full p-5 font-medium rtl:text-right text-black border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                onClick={toggleCollapse2} >
                <span>Sante et conseils</span>
                <svg className={`w-3 h-3 rotate-180 shrink-0 ${isCollapsed ? 'rotate-0' : 'rotate-180' }`} viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg"  fill="none">
                  <path  stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                </svg>
              </button>
            </h2>
            <Collapse isOpened={isCollapsed2}>
                <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                  <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-black border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-open-body-1" aria-expanded="true" aria-controls="accordion-open-body-1">
                    <span className="flex items-center"><svg className="w-5 h-5 me-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg> {semaineInfo.conseils}</span>
                  </button>
                </div>
              </Collapse>
          </> 
        ):(
          <div></div>
        )}

{semaineInfo.Info !=undefined?(  
          <>
            <h2>
              <button
                type="button"
                className="bg-purple-600 flex items-center justify-between w-full p-5 font-medium rtl:text-right text-black border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                onClick={toggleCollapse3} >
                <span>Info pour le partenaire</span>
                <svg className={`w-3 h-3 rotate-180 shrink-0 ${isCollapsed ? 'rotate-0' : 'rotate-180' }`} viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg"  fill="none">
                  <path  stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                </svg>
              </button>
            </h2>
            <Collapse isOpened={isCollapsed3}>
                <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                  <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-black border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-open-body-1" aria-expanded="true" aria-controls="accordion-open-body-1">
                    <span className="flex items-center"><svg className="w-5 h-5 me-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg> {semaineInfo.Info}</span>
                  </button>
                </div>
              </Collapse>
          </> 
        ):(
          <div></div>
        )}

{semaineInfo.Infojumeaux !=undefined?(  
          <>
            <h2>
              <button
                type="button"
                className="bg-purple-600 flex items-center justify-between w-full p-5 font-medium rtl:text-right text-black border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                onClick={toggleCollapse4} >
                <span>Info jumeaux/ Naissances multiples</span>
                <svg className={`w-3 h-3 rotate-180 shrink-0 ${isCollapsed ? 'rotate-0' : 'rotate-180' }`} viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg"  fill="none">
                  <path  stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                </svg>
              </button>
            </h2>
            <Collapse isOpened={isCollapsed4}>
                <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                  <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-black border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-open-body-1" aria-expanded="true" aria-controls="accordion-open-body-1">
                    <span className="flex items-center"><svg className="w-5 h-5 me-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg> {semaineInfo.Infojumeaux}</span>
                  </button>
                </div>
              </Collapse>
          </> 
        ):(
          <div></div>
        )}
      </div>
    </div>
  );
}

export default App;


