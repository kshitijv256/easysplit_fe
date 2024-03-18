import React, { useEffect, useState } from "react";
import Appbar from "../../components/AppBar";
import { loadFromLocalStorage } from "../../util";
import { useTranslation } from "react-i18next";

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
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [formatter, setFormatter] =
    useState<Intl.DateTimeFormat>(dateFormatterEn);
  const { t, i18n } = useTranslation();

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
    fetchTransactions().then((data) => setTransactions(data));
  }, []);

  return (
    <div>
      <Appbar />
      <div className="p-2">
        {transactions.map((tx) => (
          <div
            key={tx.date}
            className="flex flex-col gap-2 bg-gray-100 dark:bg-gray-700 p-2 rounded-lg m-2"
          >
            <h1 className="flex w-full justify-between text-xl font-bold dark:text-white">
              {tx.description}
              <span className="dark:text-gray-200">
                {formatter.format(new Date(tx.date))}
              </span>
            </h1>
            <p className="dark:text-white text-xl">
              {t("Amount")}: {tx.amount}
            </p>
            <p className="dark:text-white text-xl">
              {t("Paid By")}: {tx.by}
            </p>
            <p className="dark:text-white text-xl">
              {t("For")}: {tx.for.join(", ")}
            </p>
            <p className="dark:text-white text-xl">
              {t("Balance")}:{" "}
              {tx.balance.map((bal) => bal.name + " " + bal.amount).join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
