// import { useState } from 'react';
// import axios from 'axios';

// export default function Notes({ notes }) {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8000/api/notes/create/', {
//         title,
//         content,
//       });
//       const noteId = response.data.note_id;
//       // Mettre à jour la liste des notes
//       const updatedNotes = [...notes, { id: noteId, title, content }];
//       setNotes(updatedNotes);
//       // Réinitialiser les champs de saisie
//       setTitle('');
//       setContent('');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="container mx-auto">
//       <h1 className="text-4xl font-bold my-4">Notes</h1>
//       <form onSubmit={handleSubmit} className="my-4">
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Titre"
//           className="border border-gray-300 rounded-md p-2 mr-2"
//         />
//         <textarea
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           placeholder="Contenu"
//           className="border border-gray-300 rounded-md p-2 mr-2"
//         />
//         <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">Ajouter une note</button>
//       </form>
//       {notes.map((note) => (
//         <div key={note.id} className="my-4">
//           <h2 className="text-2xl font-bold">{note.title}</h2>
//           <p className="text-gray-700">{note.content}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// // ...

// export default Notes;


// export async function getStaticProps() {
//   const response = await axios.get('http://localhost:8000/api/notes/');
//   const notes = response.data;
//   return {
//     props: {
//       notes,
//     },
//   };
// }