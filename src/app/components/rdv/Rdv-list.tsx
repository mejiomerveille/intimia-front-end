"use client";
import Link from "next/link";
import { getCsrfToken } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal,{ setAppElement } from 'react-modal';
import Navbar from "../Navbar";

export default function RDVList() {
  const [isOpen, setIsOpen] = useState(false);

    return(
        <div>
            <Navbar/>
  <div>
      <h1 className="card-title text-center">Calendrier des rendez-vous</h1>           
    <div className="row ">
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">    
          <div className="card-header">

            <div className="card-title">
              <p>date du rdv</p> 
            </div>
          </div>
          <div className="card-body">
            <p > rdv avec </p>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-between">
              <a href="/rdv" className="btn bg-blue">Modifier</a>
              <a href="" className="btn bg-orange">Supprimer</a>
              <button className="btn_file bg-pink" type="button" data-pk="appointment.id" id="app{{appointment.id}}">Joindre un fichier</button>
            </div>
          </div>
        </div>
      </div>     
    </div>
      
    <a href="/rdv" className="btn btn-primary add-link">Ajouter un rendez-vous</a>
    <a href="/questions" className="btn btn-primary">Questions</a>
  </div>

<Modal>

  <div id="popup" className="popup">
    <div className="popup-content">
      <form method="POST" id="formFile">
        <div className="mb-3">
          <label  className="form-label">Titre pour les Resultats</label>
          <input type="text" className="form-control" id="title-examen" name="title" placeholder="Ok pour echographie"/>
        </div>
        <div className="mb-3">
          <label  className="form-label">Resultat Examen</label>
          <input className="form-control" type="file" name="file" id="formFile" required/>
        </div>
        <button type="submit">Joindre</button>
      </form>
    </div>
  </div>
</Modal>

  </div>

    );
}