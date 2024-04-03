"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL_MEDIAS, BASE_URL } from "@/app/services";
import '@/app/styl.css';
import Slideshow from "../../../pages/Slider";

const Home = () => {
 

    return (
      <div className="mt-24 content-wrapper">
        <h1>Mon diaporama</h1>

         {/* <div className="content-wrapper"> */}
        <Slideshow />
        <h1>Mon diaporama</h1>
        {/* ... Autres éléments ... */}
      {/* </div> */}
      </div>
    );
  }

export default Home;