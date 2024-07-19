"use client";
import { useState } from 'react';
import { get_otp } from '../../services';
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState('');

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const data={
      email:email,
    }
    try {
      const response = await get_otp(data);
      if (response?.data.code===200) {
        setMessages('OTP reccuperer avec succès.Veuillez consulter vos emails');
        router.push('/password/verify_otp');
      } else {
        setMessage("l'email que vous venez de saisir n'existe pas!");
      }
    } catch (error) {
      console.error(error);
      setMessage('Erreur lors de la demande.');
    }
  };

  return (
    <>
        <div className="mx-auto p-10 rounded-md shadow-md bg-gray-800 text-white mt-28 ">
            <h2 className="text-2xl font-bold text-center mb-8">Reccuperation de l'OTP</h2>
            <p>Veuillez saisir votre adresse E-mail , un code vous sera envoye</p>
            <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
                <label htmlFor="email" className="text-white font-medium">
                    Adresse email
                </label>
                <input 
                    type="email"
                    value={email}
                    id="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Adresse email"
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Envoyer l'OTP
                </button>
                {messages && (
                    <p className="text-green-500 text-sm">{message}</p>
                )}
                {message && (
                    <p className="text-red-500 text-sm">{message}</p>
                )}
            </form>
        </div>
    </>
  );
}