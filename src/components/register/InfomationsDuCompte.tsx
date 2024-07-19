"use client";
import React from 'react';

const InfoCompte = ({  donnees, handleChange, erreur, handleNextStep, handlePrevStep,handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} method='POST'>
      <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
              <label htmlFor="phone-number" className="block mb-2">
                Numero de Télephone:
              </label>
              <input  value={donnees.telephone} onChange={handleChange}
                type="tel"
                id="telephone"
                name="telephone"
                className="w-full px-3 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring focus:ring-green-500"
              />
              {erreur.telephone && <p className="text-red-500 text-sm mt-1">{erreur.telephone}</p>}
          </div>
          <div className="form-group">
              <label htmlFor="phone-number" className="block mb-2">
              E-Mail:
              </label>
              <input  value={donnees.email} onChange={handleChange}
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring focus:ring-green-500"
              />
              {erreur.email && <p className="text-red-500 text-sm mt-1">{erreur.email}</p>}
          </div>
          <div className="form-group">
              <label htmlFor="phone-number" className="block mb-2">
                Profession:
              </label>
              <input  value={donnees.prefession} onChange={handleChange}
                type="text"
                id="prefession"
                name="prefession"
                className="w-full px-3 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring focus:ring-green-500"
              />
              {erreur.profession && <p className="text-red-500 text-sm mt-1">{erreur.profession}</p>}
          </div>
          <div className="form-group">
              <label htmlFor="phone-number" className="block mb-2">
                Mot de passe :
              </label>
              <input  value={donnees.password} onChange={handleChange}
                type="password"
                id="ppassword"
                name="password"
                className="w-full px-3 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring focus:ring-green-500"
              />
              {erreur.password && <p className="text-red-500 text-sm mt-1">{erreur.password}</p>}
              {erreur.pwd && <p className="text-red-500 text-sm mt-1">{erreur.pwd}</p>}
          </div>
            <div className="form-group">
              <label htmlFor="email" className="block mb-2">
                Reécrire le mot de passe:
              </label>
              <input value={donnees.password2} onChange={handleChange}
                type="password"
                id="password2"
                name="password2"
                className="w-full px-3 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring focus:ring-green-500"
              />
            </div>
            {erreur.password2 && <p className="text-red-500 text-sm mt-1">{erreur.password2}</p>}
          <div className='col-span-2 flex justify-between'>
            <button
              type="button"
              onClick={handlePrevStep}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-gray-500"
              >
              Previous
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-green-500"
              >
              Next
            </button>
          </div>
          </div>
    </form>
  )
};
export default InfoCompte;
