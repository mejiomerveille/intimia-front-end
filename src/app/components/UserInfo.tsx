"use client";
import React, { useState, useEffect } from 'react';

const UserInfo = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/userInfo/', {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error('Erreur lors de la requête');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo();
  }, []);

  if (user) {
    return (
      <div className="grid place-items-center">
        <div className="shadow-lg p-8 bg-zinc-300 flex flex-col gap-2 my-6">
          <div>
            Nom d'utilisateur : <span className="font-bold">{user.username}</span>
          </div>
          <div>
            Email : <span className="font-bold">{user.email}</span>
          </div>
          <button className="bg-red-500 text-white font-bold px-6 py-2 mt-3">Log Out</button>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default UserInfo;