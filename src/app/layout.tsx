import Header from '@/components/ui/header1'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Banner from '@/components/site/banner'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Intimia',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-inter antialiased  text-gray-900 tracking-tight`}>
        <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
          <Header />
          {children}
          {/* <Banner /> */}
        </div>
      </body>
    </html>
  )
}

        // <div className="mt-8" key={index}>
      //     <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400 bg-gray-50">
      //       <div className="mb-4">
      //         <p className="text-lg font-bold">{rdv.message}</p>
      //       </div>
      //       <div className="mb-4">
      //         <p>{rdv.start} avec le {rdv.profession} {rdv.title} à {rdv.time}</p>
      //       </div>
      //       <div className="flex justify-between">
      //         <Link href="/rdv" className="transition duration-500 ease-in-out hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-4 py-2 cursor-pointer">
      //           Modifier
      //         </Link>
      //         <Link href="/rdv" className="transition duration-500 ease-in-out hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-4 py-2 cursor-pointer">
      //           Supprimer
      //         </Link>
      //         <button type="button" className="transition duration-500 ease-in-out hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-4 py-2 cursor-pointer">
      //           Joindre un fichier
      //         </button>
      //       </div>
      //     </div>
      //   </div>
      // ))}
      // <div className="flex justify-center mt-8">
      //   <Link href="/rdv" className="transition duration-500 ease-in-out hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-4 py-2 cursor-pointer">Ajouter un rendez-vous</Link>
      // </div>
      // <div className="flex justify-center mt-4">
      //   <Link href="/questions" className="transition duration-500 ease-in-out hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-4 py-2 cursor-pointer">Questions</Link>
      // </div>