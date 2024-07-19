import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const InfoPersonelle = ({ donnees, handleChange, erreur, handleNextStep, handlePrevStep ,handleDateChange,minDate,handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit} method='POST'>
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group">
              <label htmlFor="first-name" className="block mb-2">
              Nom :
              </label>
              <input value={donnees.first_name} onChange={handleChange}
                type="text"
                id="first_name"
                name="first_name"
                className="w-full px-3 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring focus:ring-green-500"
              />
              {erreur.first_name && <p className="text-red-500 text-sm mt-1">{erreur.first_name}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="last-name" className="block mb-2">
              Prenom :
              </label>
              <input value={donnees.last_name} onChange={handleChange}
                type="text"
                id="last_name"
                name="last_name"
                className="w-full px-3 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring focus:ring-green-500"
              />
            </div>
            <div>
            <label htmlFor="dateOfBirth" className="block text-white text-sm font-bold mb-2">
              Date of Birth:
            </label>
            <div> 
              <DatePicker
                id="date_naissance"
                selected={donnees.dateOfBirth}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                maxDate={minDate}
                name='date_naissance'
                className="w-full px-3 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring focus:ring-green-500"
              />
              {erreur.dateOfBirth && <p className="text-red-500 text-sm mt-1">{erreur.dateOfBirth}</p>}
              {erreur.dateOfBirth2 && <p className="text-red-500 text-sm mt-1">{erreur.dateOfBirth2}</p>}
            </div>
           
          </div>
          <div className="form-group">
              <label htmlFor="last-name" className="block mb-2">
              Lieu de Naissance :
              </label>
              <input value={donnees.lieu_naissance} onChange={handleChange}
                type="text"
                id="lieu_naissance"
                name="lieu_naissance"
                className="w-full px-3 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring focus:ring-green-500"
              />
            </div>
            <div className="form-group">
              <label htmlFor="date-of-birth" className="block mb-2">
               Sexe:
              </label>
                <select value={donnees.sexe} onChange={handleChange}
                  id="sexe"
                  name="sexe"
                  className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-800 focus:outline-none focus:ring focus:ring-green-500"
                >
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                </select>
                {erreur.sexe && <p className="text-red-500 text-sm mt-1">{erreur.sexe}</p>}
              
            </div>
            <div className="form-group">
              <label htmlFor="genre" className="block mb-2">
              Genre :
              </label>
              <input value={donnees.genre} onChange={handleChange}
                type="text"
                id="genre"
                name="genre"
                className="w-full px-3 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring focus:ring-green-500"
              />
              {erreur.sexe && <p className="text-red-500 text-sm mt-1">{erreur.sexe}</p>}
            </div>
            <div className="form-group">
              <label  htmlFor="pays" className="block mb-2">
               Pays:
              </label>
              <div className="flex space-x-2">
                <select  value={donnees.pays} onChange={handleChange}
                  id="pays"
                  name="pays"
                  className="w-full px-3 py-2 rounded-md border border-gray-600 bg-zinc-700 focus:outline-none focus:ring focus:ring-green-500"
                >
                  {/* <optgroup label="Afrique"> */}
                  <option value="Cameroun">Cameroun</option>
                  <option value="afrique-du-sud">Afrique du Sud</option>
                  <option value="algerie">Algérie</option>
                  {/* </optgroup> */}
                  {/* <optgroup label="Amérique"> */}
                  <option value="antigua-et-barbuda">Antigua-et-Barbuda</option>
                  <option value="argentine">Argentine</option>
                  {/* </optgroup>  */}
                </select>
                {erreur.pays && <p className="text-red-500 text-sm mt-1">{erreur.pays}</p>}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="date-of-birth" className="block mb-2">
               Dernier Diplome:
              </label>
                <select value={donnees.last_graduation} onChange={handleChange}
                  id="last_graduation"
                  name="last_graduation"
                  className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-800 focus:outline-none focus:ring focus:ring-green-500"
                >
                  <option value="BAC+1">BAC1</option>
                  <option value="BAC+2">BAC+2</option>
                  <option value="Licence">Licence</option>
                  <option value="Master">Master</option>
                </select>
                {erreur.last_graduation && <p className="text-red-500 text-sm mt-1">{erreur.last_graduation}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="last-name" className="block mb-2">
              Religion :
              </label>
              <input value={donnees.religion} onChange={handleChange}
                type="text"
                id="religion"
                name="religion"
                className="w-full px-3 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring focus:ring-green-500"
              />
              {erreur.religion && <p className="text-red-500 text-sm mt-1">{erreur.religion}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="last-name" className="block mb-2">
              Role religieux :
              </label>
              <input value={donnees.roles_religieux} onChange={handleChange}
                type="text"
                id="roles_religieux"
                name="roles_religieux"
                className="w-full px-3 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring focus:ring-green-500"
              />
              {erreur.reole_religieux && <p className="text-red-500 text-sm mt-1">{erreur.role_religieux}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="last-name" className="block mb-2">
              denomination :
              </label>
              <input value={donnees.denomination} onChange={handleChange}
                type="text"
                id="denomination"
                name="denomination"
                className="w-full px-3 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring focus:ring-green-500"
              />
              {erreur.denomination && <p className="text-red-500 text-sm mt-1">{erreur.denomination}</p>}
            </div>
          <div className="col-span-2 flex justify-between ">
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
export default InfoPersonelle;
