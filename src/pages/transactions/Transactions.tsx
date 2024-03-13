import React, { useEffect, useState } from "react";
import Appbar from "../../components/AppBar";
import { loadFromLocalStorage } from "../../util";

type Transaction = {
  amount: number;
  description: string;
  date: string;
  by: string;
  for: FormDataEntryValue[];
  balance: { name: string; amount: number }[];
};

const fetchTransactions = async () => {
  const transactions = await loadFromLocalStorage("transactions");
  return transactions;
};

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetchTransactions().then((data) => setTransactions(data));
  }, []);

  return (
    <div>
      <Appbar />
      <div className="p-2">
        {transactions.map((tx) => (
          <div
            key={tx.date}
            className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg m-2"
          >
            <h1 className="text-xl font-bold dark:text-white">
              {tx.description}
            </h1>
            <p className="dark:text-white">Amount: {tx.amount}</p>
            <p className="dark:text-white">Paid by: {tx.by}</p>
            <p className="dark:text-white">For: {tx.for.join(", ")}</p>
            <p className="dark:text-white">
              Balance:{" "}
              {tx.balance.map((bal) => bal.name + " " + bal.amount).join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
