import React from 'react';

const Profil = ({ handleProfil,handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} method='handleSubmit'>
      <div className="form-group">
              <h1 className="text-xl font-bold text-white mb-10">Veuillez choisir votre profil:</h1>
              </div>
              <div className="col-span-2 flex justify-between ">
            <button
              type="button"
              onClick={()=>handleProfil('U')}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-gray-500"
              >
              Utilisateur
            </button>
            <button
              type="button"
              onClick={()=>handleProfil('PS')}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-green-500"
              >
              Personnel de sante
            </button>
          </div> 
    </form>
  )
};
export default Profil;
