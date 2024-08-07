'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import MobileMenu from './mobile-menu';
import Image from 'next/image';
import { verifyLogin } from '@/app/services';
import Logo from '../../../public/logo.jpeg';
import { logout } from '@/app/services';
import { useRouter } from "next/navigation";


const Header = () => {
  const [top, setTop] = useState(true);
  const [token, setToken] = useState(typeof localStorage !== 'undefined' ? localStorage.getItem('access_token') : null);
  const [verif, setVerif] = useState('');
  const router = useRouter();

  const SignOut = async () => {
    const refreesh=localStorage.getItem('refresh_token')
    const data={
      refresh_token:refreesh,
    }
    try {
      const response = await logout(data);
      if (response) {
        if (response.detail=="Logged out successfully.") {
          setVerif(response.statusText);
          localStorage.removeItem('access_token');
          router.replace("/");
        }
      } else {
        console.log('Veuillez vous connecter!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await verifyLogin();
        if (response) {
          if (response.status === 200 && response.statusText === 'OK') {
            setVerif(response.statusText);
          }
        } else {
          console.log('Veuillez vous connecter!');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const scrollHandler = () => {
      setTop(window.pageYOffset > 10 ? false : true);
    };

    if (top) {
      scrollHandler();
      window.addEventListener('scroll', scrollHandler);
      return () => {
        window.removeEventListener('scroll', scrollHandler);
      };
    }
  }, [top]);

  return (
    <header className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top ? 'bg-white backdrop-blur-sm shadow-lg' : ''}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
        <a className="text-pink-600 no-underline hover:no-underline font-bold text-2xl lg:text-4xl" href="/">
            <div className="shrink-0 mr-4">
            <Image src={Logo} alt="Logo" width="60" height="60" />
          </div>
            </a>

          <nav className="hidden md:flex md:grow">
            <ul className="flex grow justify-end flex-wrap items-center">
              {verif!='OK'? (
                <>
                  <li>
                    <Link href="/blog" className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/login" className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">
                      Se connecter
                    </Link>
                  </li>
                  <li>
                    <Link href="/register" className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">
                      <span>S&apos;inscrire</span>
                      <svg className="w-3 h-3 fill-current text-gray-400 shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                      </svg>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/" className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">
                      Accueil
                    </Link>
                  </li>
                  <li>
                    <Link href="/suivie" className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">
                      Suivie
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/chat" className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">
                      ChatBot
                    </Link>
                  </li>
                  <li>
              <Link href="/profil" className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">
              <svg className="h-8 w-8 text-gray-600"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
              </Link>
              </li>
              <li>
              <Link href="/notifications" className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">
             
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M15.133 10.632v-1.8a5.407 5.407 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V1.1a1 1 0 0 0-2 0v2.364a.944.944 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C4.867 13.018 3 13.614 3 14.807 3 15.4 3 16 3.538 16h12.924C17 16 17 15.4 17 14.807c0-1.193-1.867-1.789-1.867-4.175Zm-13.267-.8a1 1 0 0 1-1-1 9.424 9.424 0 0 1 2.517-6.39A1.001 1.001 0 1 1 4.854 3.8a7.431 7.431 0 0 0-1.988 5.037 1 1 0 0 1-1 .995Zm16.268 0a1 1 0 0 1-1-1A7.431 7.431 0 0 0 15.146 3.8a1 1 0 0 1 1.471-1.354 9.425 9.425 0 0 1 2.517 6.391 1 1 0 0 1-1 .995ZM6.823 17a3.453 3.453 0 0 0 6.354 0H6.823Z"/>
              </svg>
              </Link>
              </li>
              <li>
                <button onClick={SignOut} className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">Se déconnecter</button>
              </li>
              

              </>
             )}
             
            </ul>

          </nav>

          <MobileMenu />

        </div>
      </div>
    </header>
  )
}
export default Header;
