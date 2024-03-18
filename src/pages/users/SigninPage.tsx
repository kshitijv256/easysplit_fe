import React from "react";
import { Navigate } from "react-router-dom";
import Appbar from "../../components/AppBar";

const API_URL = "http://localhost:5000/api";

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const form = e.currentTarget;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      Navigate({
        to: "/dashboard",
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const SignupPage = () => {
  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <Appbar />
      <h1>Signup Page</h1>
      <div className="p-4 rounded bg-gray-200 dark:bg-slate-700 text-black">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            name="name"
            placeholder="Username"
            className="p-2 rounded border-0 ring-1 focus:outline-none dark:bg-slate-200 ring-gray-500 focus:ring-amber-400 w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-2 rounded border-0 ring-1 focus:outline-none dark:bg-slate-200 ring-gray-500 focus:ring-amber-400 w-full"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-2 rounded border-0 ring-1 focus:outline-none dark:bg-slate-200 ring-gray-500 focus:ring-amber-400 w-full"
          />
          <input
            type="submit"
            value="Sign Up"
            className="p-2 rounded bg-amber-700 text-white dark:bg-amber-600"
          />
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
