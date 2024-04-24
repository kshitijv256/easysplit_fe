import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Appbar from "../../components/AppBar";
import { login } from "../../utils/api";
import { saveToLocalStorage } from "../../util";
import { UserContext } from "../../context/user";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    login(data)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
          return;
        }
        console.log("Success:", data);
        saveToLocalStorage("userData", data);
        setUser(data);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className="flex flex-col items-center w-full gap-4">
      <Appbar />
      <h1>{t("Login")}</h1>
      <div className="p-4 rounded bg-gray-200 dark:bg-slate-700">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
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
          <input
            type="submit"
            value={t("Login")}
            className="p-2 rounded bg-amber-700 text-white dark:bg-amber-600"
          />
        </form>
        <p className="p-2">
          {t("New here?")}{" "}
          <Link to={"/signup"} className="text-amber-500">
            {t("Register")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
