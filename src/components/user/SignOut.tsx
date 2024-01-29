"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { logout } from '@/app/services';

const SignOut = () => {
  const [user, setUser] = useState(null);
  // const [token, setToken] = useState(null);
  const router = useRouter();

  const SignOut = async () =>  {
    const response = logout()
    setUser(null);
    localStorage.removeItem('token');
    router.replace("/");
  };

    return (
          <button
          onClick={() => SignOut()}
          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
           >Log Out</button>
    );
};

export default SignOut;