/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Appbar from "../components/AppBar";
import { loadFromLocalStorage } from "../util";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { addTransaction, fetchUsers } from "../utils/api";
import { User } from "../types/user";

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const getMenbers = async () => {
    const user = await loadFromLocalStorage("userData");
    const menbers = await fetchUsers(user.groupId).then((res) => res.json());
    setUsers(menbers);
  };

  useEffect(() => {
    getMenbers();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // throw new Error("Function not implemented.");
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const forList = formData.getAll("forId");
    const finaldata = { ...data, forId: forList };
    console.log(finaldata);
    const res: any = await addTransaction(finaldata);
    if (res["success"]) {
      navigate("/transactions");
      console.log("Transaction added successfully");
    }
  };

  return (
    <div className="h-full dark:bg-gray-800 flex flex-col items-center">
      <Appbar />
      <h1 className="text-2xl font-bold my-4 dark:text-white ">
        {t("Dashboard")}
      </h1>
      <div className="p-2">
        <form
          onSubmit={handleSubmit}
          action="transaction"
          className="flex flex-col items-start gap-4 p-4 rounded bg-gray-100 dark:bg-gray-700 shadow-md dark:text-black"
        >
          <h3 className="font-bold text-lg dark:text-white">
            {t("Add Transaction")}
          </h3>
          <input
            required
            className="p-2 rounded border-0 ring-1 focus:outline-none dark:bg-slate-200 ring-gray-500 focus:ring-amber-400"
            type="number"
            step="0.01"
            name="amount"
            placeholder={t("Amount")}
          />
          <input
            required
            className="p-2 rounded border-0 ring-1 focus:outline-none dark:bg-slate-200 ring-gray-500 focus:ring-amber-400"
            type="text"
            name="description"
            placeholder={t("Description")}
          />
          <h3 className="font-bold text-lg dark:text-white">{t("Paid By")}</h3>
          {users.map((item, idx) => (
            <div key={idx}>
              <input
                required
                type="radio"
                id={`${item.id}`}
                name="userId"
                key={idx}
                value={item.id}
                className="dark:text-white mx-2"
              />
              <label htmlFor={`${item.id}`} className="dark:text-white">
                {item.firstName + " " + item.lastName}
              </label>
            </div>
          ))}

          <div className="font-bold text-lg dark:text-white">{t("For")}</div>
          <select
            required
            name="forId"
            className="dark:bg-gray-700 w-full overflow-hidden p-2 rounded border-0 ring-1 ring-gray-500 focus:outline-none focus:ring-amber-400"
            multiple
          >
            {users.map((item, idx) => (
              <option
                key={idx}
                value={item.id}
                className="checked:bg-amber-400/60 rounded dark:text-white dark:bg-gray-700 dark:checked:bg-amber-600/60 p-1 my-1"
              >
                {item.firstName + " " + item.lastName}
              </option>
            ))}
          </select>
          <div className="flex flex-row-reverse w-full">
            <button
              className="bg-amber-400 dark:bg-amber-600 text-white px-4 py-2 rounded shadow-md"
              type="submit"
            >
              + {t("Add")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
