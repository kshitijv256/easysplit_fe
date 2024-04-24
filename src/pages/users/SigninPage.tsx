import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Appbar from "../../components/AppBar";
import { signup } from "../../utils/api";
import { useTranslation } from "react-i18next";

const SignupPage = () => {
  const [group, setGroup] = useState<string>("create");
  const navigate = useNavigate();
  const { t } = useTranslation();

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
        if (data["id"]) {
          localStorage.setItem("userData", JSON.stringify(data));
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <Appbar />
      <h1>{t("Signup")}</h1>
      <div className="p-4 rounded bg-gray-200 dark:bg-slate-700 text-black">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-2">
            <input
              type="text"
              name="firstName"
              placeholder={t("First Name")}
              className="p-2 rounded border-0 ring-1 focus:outline-none dark:bg-slate-200 ring-gray-500 focus:ring-amber-400 w-full"
            />
            <input
              type="text"
              name="lastName"
              placeholder={t("Last Name")}
              className="p-2 rounded border-0 ring-1 focus:outline-none dark:bg-slate-200 ring-gray-500 focus:ring-amber-400 w-full"
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder={t("Email")}
            className="p-2 rounded border-0 ring-1 focus:outline-none dark:bg-slate-200 ring-gray-500 focus:ring-amber-400 w-full"
          />
          <input
            type="password"
            name="password"
            placeholder={t("Password")}
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
                onClick={(e) => {
                  e.preventDefault();
                  setGroup("create");
                }}
              >
                {t("Create Group")}
              </button>
              <button
                className={`${
                  group === "join"
                    ? "text-amber-500"
                    : "text-black dark:text-white"
                } p-2 text-xl rounded bg-slate-200 dark:bg-slate-600`}
                onClick={(e) => {
                  e.preventDefault();
                  setGroup("join");
                }}
              >
                {t("Join Group")}
              </button>
            </div>
            {group === "create" && (
              <input
                type="text"
                name="groupName"
                placeholder={t("Group Name")}
                className="p-2 rounded border-0 ring-1 focus:outline-none dark:bg-slate-200 ring-gray-500 focus:ring-amber-400 w-full"
              />
            )}
            {group === "join" && (
              <input
                type="text"
                name="groupCode"
                placeholder={t("Group Code")}
                className="p-2 rounded border-0 ring-1 focus:outline-none dark:bg-slate-200 ring-gray-500 focus:ring-amber-400 w-full"
              />
            )}
          </div>
          <button
            type="submit"
            className="p-2 rounded bg-amber-700 text-white dark:bg-amber-600"
          >
            {t("Submit")}
          </button>
        </form>
        <p className="text-black dark:text-white p-2">
          {t("Already a member?")}{" "}
          <Link to="/signin" className="text-amber-700 dark:text-amber-600">
            {t("Login")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
