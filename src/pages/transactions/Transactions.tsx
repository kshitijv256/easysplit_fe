import React, { useContext, useEffect, useState } from "react";
import Appbar from "../../components/AppBar";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../context/user";
import {
  deleteTransaction,
  fetchTransactions,
  fetchUsers,
} from "../../utils/api";
import { User } from "../../types/user";
import { calculate } from "../../utils/common";
import PaymnetsModal from "../users/PaymentsModal";
import TransactionCard from "./TransactionCard";

export type Transaction = {
  id: number;
  amount: number;
  description: string;
  by: number;
  for: number[];
  completed: boolean;
  createdAt: string;
};

const getTransactions = async (userId: number) => {
  const transactions: Transaction[] = await fetchTransactions(userId);
  return transactions;
};

const dateFormatterFr = new Intl.DateTimeFormat("fr-FR", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const dateFormatterEn = new Intl.DateTimeFormat("en-IN", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const dateFormatterEs = new Intl.DateTimeFormat("es-ES", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const Transactions = () => {
  const { user } = useContext(UserContext);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [members, setMembers] = useState<User[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [payments, setPayments] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [formatter, setFormatter] =
    useState<Intl.DateTimeFormat>(dateFormatterEn);
  const { t, i18n } = useTranslation();

  const getMenbers = async () => {
    if (user?.groupId) {
      const members = await fetchUsers(user.groupId).then((res) => res.json());
      setMembers(members);
    }
  };

  const mapIdtoName = (id: number) => {
    const user = members.find((user) => user.id == id);
    return user?.firstName + " " + user?.lastName;
  };

  const resolve = () => {
    const balance: { [key: string]: number } = {};
    for (let i = 0; i < transactions.length; i++) {
      const tx = calculate(transactions[i]);
      for (let j = 0; j < tx.length; j++) {
        const name: string = mapIdtoName(tx[j].id);
        if (balance[name]) {
          balance[name] += tx[j].amount;
        } else {
          balance[name] = tx[j].amount;
        }
      }
    }
    // console.log(balance);
    const balanceList = Object.entries(balance).map(([key, value]) => ({
      name: key,
      amount: value,
    }));
    const sortedList = balanceList.sort((a, b) => a.amount - b.amount);
    // console.log(sortedList);
    const payments = [];
    let i = 0;
    let j = sortedList.length - 1;
    while (i < j) {
      const amount = Math.min(
        Math.abs(sortedList[i].amount),
        Math.abs(sortedList[j].amount)
      );
      sortedList[i].amount += amount;
      sortedList[j].amount -= amount;
      payments.push({
        from: sortedList[j].name,
        to: sortedList[i].name,
        amount: amount,
      });
      if (sortedList[i].amount === 0) i++;
      if (sortedList[j].amount === 0) j--;
    }
    setPayments(payments);
    setOpen(true);
    // console.log(payments);
  };

  const removeTransaction = async (id: number) => {
    const res: boolean = await deleteTransaction(id);
    if (res) setTransactions(transactions.filter((tx) => tx.id !== id));
  };
  useEffect(() => {
    const locale = i18n.language;
    if (locale === "fr") {
      setFormatter(dateFormatterFr);
    } else if (locale === "en") {
      setFormatter(dateFormatterEn);
    } else if (locale === "es") {
      setFormatter(dateFormatterEs);
    }
  }, [i18n.language]);

  useEffect(() => {
    getMenbers();
    if (user) getTransactions(user!.id).then((data) => setTransactions(data));
  }, [user]);

  return (
    <div className="w-full flex flex-col items-center">
      <Appbar />
      <h2 className="font-bold p-2 text-2xl">{t("Transactions")}</h2>
      <button
        className="fixed bottom-8 right-8 px-4 py-3 rounded bg-amber-700 dark:bg-amber-600 text-white font-bold"
        onClick={() => {
          resolve();
        }}
      >
        {t("Resolve")}
      </button>
      <div className="p-2 center w-1/2">
        {transactions.map((tx) => (
          <TransactionCard
            tx={tx}
            formatter={formatter}
            mapIdtoName={mapIdtoName}
            deleteCB={removeTransaction}
          />
        ))}
      </div>
      <PaymnetsModal
        paymnets={payments}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export default Transactions;
