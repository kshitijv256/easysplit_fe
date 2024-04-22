import React, { useContext, useEffect, useState } from "react";
import Appbar from "../../components/AppBar";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../context/user";
import { fetchTransactions, fetchUsers } from "../../utils/api";
import { User } from "../../types/user";
import { calculate } from "../../utils/common";
import PaymnetsModal from "../users/PaymentsModal";

type Transaction = {
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
      <h2 className="self-start p-2 text-2xl">{t("Transactions")}</h2>
      <button
        className="fixed bottom-8 right-8 px-4 py-3 rounded bg-amber-700 dark:bg-amber-600 text-whit font-bold"
        onClick={() => {
          resolve();
        }}
      >
        Resolve
      </button>
      <div className="p-2 center w-3/4">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex flex-col gap-2 bg-gray-100 dark:bg-gray-700 p-2 rounded-lg m-2"
          >
            <h1 className="flex w-full justify-between text-xl font-bold dark:text-white">
              {tx.description}
              <span className="dark:text-gray-200">
                {formatter.format(new Date(tx.createdAt))}
              </span>
            </h1>
            <p className="dark:text-white text-xl">
              {t("Amount")}: {tx.amount}
            </p>
            <p className="dark:text-white text-xl">
              {t("Paid By")}: {mapIdtoName(tx.by)}
            </p>
            <p className="dark:text-white text-xl">
              {t("For")}: {tx.for.map((u) => mapIdtoName(u)).join(", ")}
            </p>
            {/* <p className="dark:text-white text-xl">
              {t("Balance")}:{" "}
              {tx.balance.map((bal) => bal.name + " " + bal.amount).join(", ")}
            </p> */}
          </div>
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
