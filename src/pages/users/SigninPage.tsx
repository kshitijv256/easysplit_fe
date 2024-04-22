import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Appbar from "../../components/AppBar";
import { signup } from "../../utils/api";

const SignupPage = () => {
  const [group, setGroup] = useState<string>("create");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    let endpoint = "join";
    if (group === "create") {
      endpoint = "create";
    }
    signup(data, endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        localStorage.setItem("userData", JSON.stringify(data));
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <Appbar />
      <h1>Signup Page</h1>
      <div className="p-4 rounded bg-gray-200 dark:bg-slate-700 text-black">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-2">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              className="p-2 rounded border-0 ring-1 focus:outline-none dark:bg-slate-200 ring-gray-500 focus:ring-amber-400 w-full"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              className="p-2 rounded border-0 ring-1 focus:outline-none dark:bg-slate-200 ring-gray-500 focus:ring-amber-400 w-full"
            />
          </div>
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
          <div className="flex flex-col gap-4">
            <div className="flex justify-evenly">
              <button
                className={`${
                  group === "create"
                    ? "text-amber-500"
                    : "text-black dark:text-white"
                } p-2 text-xl rounded bg-slate-200 dark:bg-slate-600`}
                onClick={() => {
                  setGroup("create");
                }}
              >
                Create group
              </button>
              <button
                className={`${
                  group === "join"
                    ? "text-amber-500"
                    : "text-black dark:text-white"
                } p-2 text-xl rounded bg-slate-200 dark:bg-slate-600`}
                onClick={() => {
                  setGroup("join");
                }}
              >
                Join group
              </button>
            </div>
            {group === "create" && (
              <input
                type="text"
                name="groupName"
                placeholder="Group name"
                className="p-2 rounded border-0 ring-1 focus:outline-none dark:bg-slate-200 ring-gray-500 focus:ring-amber-400 w-full"
              />
            )}
            {group === "join" && (
              <input
                type="text"
                name="groupCode"
                placeholder="Group code"
                className="p-2 rounded border-0 ring-1 focus:outline-none dark:bg-slate-200 ring-gray-500 focus:ring-amber-400 w-full"
              />
            )}
          </div>
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
