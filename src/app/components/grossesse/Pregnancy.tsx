import { useState } from "react";

export default function PregnancyForm() {
  const [startDate, setStartDate] = useState("");

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Ajouter ici la logique pour enregistrer la date de début de grossesse
    console.log("Date de début de grossesse enregistrée :", startDate);
  };

  const handleEdit = () => {
    // Ajouter ici la logique pour modifier la date de début de grossesse
    console.log("Modifier la date de début de grossesse");
  };

  const handleDelete = () => {
    // Ajouter ici la logique pour supprimer la date de début de grossesse
    console.log("Supprimer la date de début de grossesse");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Enregistrer la date de début de grossesse</h2>
      <form onSubmit={handleFormSubmit} className="mb-4">
        <div className="mb-4">
          <label htmlFor="start-date" className="text-lg font-semibold block mb-2">Date de début :</label>
          <input
            type="date"
            id="start-date"
            className="border border-gray-300 rounded-lg p-2"
            value={startDate}
            onChange={handleStartDateChange}
            required
          />
        </div>
        <div className="flex justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Enregistrer
          </button>
          <div>
            <button onClick={handleEdit} className="text-purple-500 hover:text-purple-700 font-semibold mr-2">
              Modifier
            </button>
            <button onClick={handleDelete} className="text-red-500 hover:text-red-700 font-semibold">
              Supprimer
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}