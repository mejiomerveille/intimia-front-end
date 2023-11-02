"use client";
import SemaineForm from "./Semaine.component";
import ImagesForm from "./Images.component";
import InfoGrossesseForm from "./InfoGrossesse.component";
import React from "react";

export default function EvolutionGrossesseForm() {
  
  return (
    <div className="bg-pink-100">
      {/* semaines */}
      <SemaineForm/>

      {/* images  */}
      <ImagesForm/>

      {/* instruction  */}
      <InfoGrossesseForm/>

    </div>
        
    );
}