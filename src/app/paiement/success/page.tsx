import React from 'react';

export default function SuccessPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className='bg-purple-500'>

        <div className="bg-green-500 rounded-full w-20 h-20 flex items-center justify-center mb-6">
          <svg className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">Paiement réussi !</h2>
        </div>
        <p className="text-gray-600 mb-8">Votre paiement de 2132 €cia été effectué avec succès.</p>
        <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded">
          Terminer
        </button>
      </div>
    </div>
  );
}
// import React from 'react';
// import { BASE_URL_MEDI,BASE_URL_MED,BASE_URL_ME ,BASE_URL_,BG,BASE_URL_M} from "../../../app/services";
// import Link from 'next/link';

// function SignInForm() {
//   return (
//     <div className="flex min-h-screen">
//       <div className="flex flex-col justify-center items-center p-6 w-full">
//         <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex items-center">
//         <div className="w-1/2 flex flex-col justify-center items-center">
//             <img
//               src={BG}
//               alt="Illustration"
//               className="max-h-full max-w-full w-96"
//             />
//             <div className="mt-4 text-center">
//               <Link className="text-sm mt-3" href={"/register"}>
//                 Mot de passe oublié? <span className="underline">creer un nouveau</span>
//               </Link><br />
//               <Link className="text-sm mt-3" href={"/register"}>
//                 Vous n&apos;avez pas de compte? <span className="underline">S'inscrire</span>
//               </Link>
//             </div>
//           </div>
//           <div className="w-1/2">
//             <h1 className="text-2xl font-bold text-gray-800 mb-6">Sign in</h1>
//             <form className="w-full max-w-md" onSubmit={handleSubmit} method="POST">
//               <div className="mb-4">
//                 <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
//                   Numero de Télephone
//                 </label>
//                 <input
//                  onChange={handleChange}
//                  type="text"
//                  value={values.username}
//                  id="username"
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   placeholder="John Doe"
//                   />
//               {errors.username && touched.username && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.username}</span>}
//               </div>
//               <div className="mb-6">
//                 <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
//                   Mot de Passe
//                 </label>
//                 <input
//                   onChange={handleChange}
//                   type="password"
//                   value={values.password}
//                   id="password"
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   placeholder="********"
//                   />
//               {errors.password && touched.password && <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.password}</span>}
//               </div>
//               <div className="flex items-center justify-between mb-4">
//                 <input type="checkbox" id="remember" className="mr-2" />
//                 <label htmlFor="remember" className="text-gray-700 text-sm font-bold">
//                   Remember me
//                 </label>
//               </div>
//               <div className="flex items-center justify-center">
//                 <button
//                   type="submit"
//                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline"
//                 >
//                   {isLoading ? (
//                       <BeatLoader color={"#ffffff"} loading={isLoading} css={override} size={10} />
//                     ) : ( "Se connecter"
//                   )}
//                 </button>
//               </div>
//               <div className="mt-4 text-center">
//                 <span className="text-gray-700 text-sm font-bold">Or login with</span>
//                 <div className="flex justify-center mt-2">
//                   <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline mr-2">
//                     <i className="fab fa-facebook-f"></i>
//                   </button>
//                   <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline mr-2">
//                     <i className="fab fa-twitter"></i>
//                   </button>
//                   <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline">
//                     <i className="fab fa-google"></i>
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
          
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignInForm;