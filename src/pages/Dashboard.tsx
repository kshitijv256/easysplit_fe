/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Appbar from "../components/AppBar";
import { loadFromLocalStorage, saveToLocalStorage } from "../util";

const updateUsers = async (setUsersCB: (user: string[]) => void) => {
  const usersList = await loadFromLocalStorage("users");
  const names = usersList.map((user: any) => user.name);
  setUsersCB(names);
};

const Dashboard = () => {
  const [users, setUsers] = useState<string[]>([]);

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
  };

  return (
    <div className="h-full dark:bg-gray-800">
      <nav>
        <Appbar />
      </nav>
      <div className="p-2">
        <h1 className="text-2xl dark:text-white">Dashboard</h1>
        <center>
          <form
            onSubmit={handleSubmit}
            action="transaction"
            className="flex flex-col items-start gap-2 w-full md:w-1/2 lg:w-3/8 p-4 rounded bg-gray-200 dark:bg-gray-700 shadow-md dark:text-black"
          >
            <h3 className="font-bold text-lg dark:text-white">
              Add Transaction
            </h3>
            <input
              required
              className="p-2 rounded border-0 ring-1 focus:outline-none focus:ring-amber-400 w-full"
              type="number"
              name="amount"
              placeholder="Amount"
            />
            <input
              required
              className="p-2 rounded border-0 ring-1 focus:outline-none focus:ring-amber-400 w-full"
              type="text"
              name="description"
              placeholder="Description"
            />
            <input
              required
              className="p-2 rounded border-0 ring-1 focus:outline-none focus:ring-amber-400 w-full"
              type="date"
              name="date"
              placeholder="Date"
            />
            <h3 className="font-bold text-lg dark:text-white">Paid By</h3>
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

            <div className="font-bold text-lg dark:text-white">For</div>
            <select
              required
              name="for"
              className="dark:bg-gray-700 overflow-hidden w-full p-2 rounded border-0 ring-1 ring-gray-500 focus:outline-none focus:ring-amber-400"
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
            <div className="flex w-full flex-row-reverse">
              <button
                className="bg-amber-400 dark:bg-amber-600 text-white px-4 py-2 rounded shadow-md"
                type="submit"
              >
                + Add
              </button>
            </div>
          </form>
        </center>
      </div>
    </div>
  );
};

export default Dashboard;
