"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password2, setPassword2] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !email || !password || !first_name || !password2 || !last_name ) {
      setError("All fields are necessary.");
      return;
    }

    try {

      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json'

        },
        body: JSON.stringify({
          username,
          email,
          first_name,
          last_name,
          password,
          password2,
        }),
      });
        if (response.ok) {
            const data = await response.json()
            console.log(data)
            router.push("/");

        }
        else {
            const error = await response.json()
            console.log(error);
            if (response.status === 400) {
                error.value = error
            }
        }
        
    }
    catch (error) {
        console.log(error)
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Register</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Pseudo"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
          <input
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            placeholder="Nom"
          />
          <input
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            placeholder="Prenom"
          />
          
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />

          <input
            onChange={(e) => setPassword2(e.target.value)}
            type="password"
            placeholder="Confirm Password"
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Register
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/"}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}