"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { verify_otp } from '../../services';

export default function VerifyOTP() {
  const router = useRouter();
  const [otp, setOTP] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const email=localStorage.getItem('email')
    const data={
      email:email,
      otp_code:otp,
    }
    setIsLoading(true);
    try {
      const response = await verify_otp(data);
      console.log(response?.data)
      if (response?.data.statut===200) {
        router.push('/password/reset');
      } else {
        setMessage( 'OTP incorrect.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Erreur lors de la vérification de lOTP.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto p-10 rounded-md shadow-md bg-gray-800 text-white mt-24 ">
      <h2 className="text-2xl font-bold text-center mb-8">verification de l'OTP</h2>

      <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
        <label htmlFor="otp" className="text-white font-medium">
          Entrer le Code OTP
        </label>
        <input
          type="text"
          value={otp}
          id="otp_code"
          name="otp_code"
          onChange={(e) => setOTP(e.target.value)}
          placeholder="Code OTP"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        >
          {isLoading ? 'Vérification...' : 'Vérifier l\'OTP'}
        </button>
        {message && (
          <p className="text-red-500 text-sm">{message}</p>
        )}
      </form>
    </div>
  );
}