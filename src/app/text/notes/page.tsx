"use client";
import { useState } from 'react';
import { forgot_password } from '../../services';
export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const data={
      email:email,
    }
    try {
      const response = await forgot_password(data);
      if (response.message==="OTP envoyé avec succès.") {
        setMessage('OTP envoyé avec succès.');
      } else {
        setMessage("Erreur lors de l'envoi de l'OTP.");
      }
    } catch (error) {
      console.error(error);
      setMessage('Erreur lors de la demande.');
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="mt-20 flex flex-col gap-4">
  <label htmlFor="email" className="text-gray-700 font-medium">
    Adresse email
  </label>
  <input
    type="email"
    value={email}
    id="email"
    name="email"
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Adresse email"
    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
    Envoyer l'OTP
  </button>
  {message && (
    <p className="text-red-500 text-sm">{message}</p>
  )}
</form>
        </>
  );
}