// import React, { useState } from 'react';

// const PaymentPage = () => {
//   const [cardNumber, setCardNumber] = useState('');
//   const [expirationDate, setExpirationDate] = useState('');
//   const [cvv, setCvv] = useState('');
//   const [name, setName] = useState('');
//   const [address, setAddress] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [zip, setZip] = useState('');

//   const handleSubmit = (e: { preventDefault: () => void; }) => {
//     e.preventDefault();
//     // Ici, vous pouvez ajouter la logique de traitement du paiement
//     console.log('Paiement effectué avec succès !');
//   };

//   return (
//     <div className="flex justify-center items-center h-auto  mt-24">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Choisir le mode de Paiement</h2>
//         <form onSubmit={handleSubmit}>
//         <button
//             type="submit"
//             className="mb-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md w-full"
//           >
//             Payer avec OM
//           </button>
//           <button
//             type="submit"
//             className="mb-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md w-full"
//           >
//             Payer avec momo
//           </button>
//           <p className='text-center mb-4'>Ou payer par carte</p>
//           <div className="mb-4">
//             <label htmlFor="cardNumber" className="block font-bold mb-2">
//               Numéro de carte
//             </label>
//             <input
//               type="text"
//               id="cardNumber"
//               className="border rounded-md px-4 py-2 w-full"
//               value={cardNumber}
//               onChange={(e) => setCardNumber(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="expirationDate" className="block font-bold mb-2">
//               Date d'expiration
//             </label>
//             <input
//               type="text"
//               id="expirationDate"
//               className="border rounded-md px-4 py-2 w-full"
//               value={expirationDate}
//               onChange={(e) => setExpirationDate(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="cvv" className="block font-bold mb-2">
//               CVV
//             </label>
//             <input
//               type="text"
//               id="cvv"
//               className="border rounded-md px-4 py-2 w-full"
//               value={cvv}
//               onChange={(e) => setCvv(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="name" className="block font-bold mb-2">
//               Nom sur la carte
//             </label>
//             <input
//               type="text"
//               id="name"
//               className="border rounded-md px-4 py-2 w-full"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="address" className="block font-bold mb-2">
//               Adresse
//             </label>
//             <input
//               type="text"
//               id="address"
//               className="border rounded-md px-4 py-2 w-full"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               required
//             />
//           </div>
//           <div className="grid grid-cols-2 gap-4 mb-4">
//             <div>
//               <label htmlFor="city" className="block font-bold mb-2">
//                 Ville
//               </label>
//               <input
//                 type="text"
//                 id="city"
//                 className="border rounded-md px-4 py-2 w-full"
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="state" className="block font-bold mb-2">
//                 État
//               </label>
//               <input
//                 type="text"
//                 id="state"
//                 className="border rounded-md px-4 py-2 w-full"
//                 value={state}
//                 onChange={(e) => setState(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="zip" className="block font-bold mb-2">
//                 Code postal
//               </label>
//               <input
//                 type="text"
//                 id="zip"
//                 className="border rounded-md px-4 py-2 w-full"
//                 value={zip}
//                 onChange={(e) => setZip(e.target.value)}
//                 required
//               />
//             </div>
//           </div>
//           <button
//             type="submit"
//             className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md w-full"
//           >
//             Payer
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;

// PaymentPage.jsimport React, { useState } from 'react';