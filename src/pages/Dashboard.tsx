/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Appbar from "../components/AppBar";
import { loadFromLocalStorage, saveToLocalStorage } from "../util";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const updateUsers = async (setUsersCB: (user: string[]) => void) => {
  const usersList = await loadFromLocalStorage("users");
  const names = usersList.map((user: any) => user.name);
  setUsersCB(names);
};

const Dashboard = () => {
  const [users, setUsers] = useState<string[]>([]);
  const { t } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    updateUsers(setUsers);
  }, []);

  const calculate = (data: any) => {
    const total = data.amount;
    const forUsers = data.for;
    const paidBy = data.by;
    const amount = total / forUsers.length;
    const result = forUsers.map((user: string) => {
      if (user === paidBy) {
        return { name: user, amount: amount - total };
      } else {
        return { name: user, amount: amount };
      }
    });
    return result;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // throw new Error("Function not implemented.");
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const finaldata = { ...data, for: formData.getAll("for") };
    const balance = calculate(finaldata);
    const transaction = { ...finaldata, balance: balance };
    console.log(transaction);
    const txList = await loadFromLocalStorage("transactions");
    txList.push(transaction);
    saveToLocalStorage("transactions", txList);
    navigate("/transactions");
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
          <input
            required
            className="p-2 w-full rounded border-0 ring-1 focus:outline-none dark:bg-slate-200 ring-gray-500 focus:ring-amber-400"
            type="date"
            name="date"
            placeholder="Date"
          />
          <h3 className="font-bold text-lg dark:text-white">{t("Paid By")}</h3>
          {users.map((item, idx) => (
            <div key={idx}>
              <input
                required
                type="radio"
                id={item}
                name="by"
                key={idx}
                value={item}
                className="dark:text-white mx-2"
              />
              <label htmlFor={item} className="dark:text-white">
                {item}
              </label>
            </div>
          ))}

          <div className="font-bold text-lg dark:text-white">{t("For")}</div>
          <select
            required
            name="for"
            className="dark:bg-gray-700 w-full overflow-hidden p-2 rounded border-0 ring-1 ring-gray-500 focus:outline-none focus:ring-amber-400"
            multiple
          >
            {users.map((item, idx) => (
              <option
                key={idx}
                value={item}
                className="checked:bg-amber-400/60 rounded dark:text-white dark:bg-gray-700 dark:checked:bg-amber-600/60 p-1 my-1"
              >
                {item}
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
