import csrf from 'csrf';

// Create a CSRF instance
const tokens = new csrf();

// Generate a CSRF token
export function getCSRFToken(req, res) {
  const secret = process.env.CSRF_SECRET || 'defaultSecret';
  const token = tokens.create(secret);
  res.setHeader('Set-Cookie', `csrfToken=${token}; Path=/`);
  return token;
}

// Validate a CSRF token
export function validateCSRFToken(req, res) {
  const secret = process.env.CSRF_SECRET || 'defaultSecret';
  const token = req.cookies.csrfToken || '';
  return tokens.verify(secret, token);
}

// <div className='grid place-items-center'>
//           <h1 className="text-xl font-bold my-4">Mon objectif:</h1>
//           <div className="flex">
//             <div className="rounded-full bg-blue-500 text-white py-2 px-4 mr-2">Suivre mon cycle</div>
//             <div className="rounded-full bg-blue-500 text-white py-2 px-4 mr-2">Tomber enceinte</div>
//             <Link href={"grossesse"}>
//               <div className="rounded-full bg-blue-500 text-white py-2 px-4">Suivre ma grossesse</div>
//             </Link>
//           </div>
//         </div>
//         <div className='grid place-items-center'>
//           <div className="shadow-lg p-8 bg-zinc-300 flex flex-col gap-2 my-6 rounded-xl">
//             <ul className='space-y-2'>
//               <li className='cursor-pointer hover:bg-red-500'>Paramètres de la grossesse<span className="material-icons mr-2 text-gray-600 text-2xl">chevron_right</span> </li>
//               <li className='cursor-pointer hover:bg-red-500'>Graphiques et rapports<span className="material-icons mr-2 text-gray-600 text-2xl">chevron_right</span></li>
//               <li className='cursor-pointer hover:bg-red-500'>Cycle et ovulation<span className="material-icons mr-2 text-gray-600 text-2xl">chevron_right</span></li>
//               <li className='cursor-pointer hover:bg-red-500'>Code d'accès<span className="material-icons mr-2 text-gray-600 text-2xl">chevron_right</span></li>
//               <li className='cursor-pointer hover:bg-red-500'>Parametre<span className="material-icons mr-2 text-gray-600 text-2xl">chevron_right</span></li>
//               <li className='cursor-pointer hover:bg-red-500'>Rappels<span className="material-icons mr-2 text-gray-600 text-2xl">chevron_right</span></li>
//               <li className='cursor-pointer hover:bg-red-500'>Aide<span className="material-icons mr-2 text-gray-600 text-2xl">chevron_right</span></li>
//             </ul>
//           </div>
//         </div>