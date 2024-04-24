import React from "react";
import { Transaction } from "./Transactions";
import { useTranslation } from "react-i18next";
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline";

const TransactionCard = (props: {
  tx: Transaction;
  formatter: Intl.DateTimeFormat;
  mapIdtoName: (id: number) => string;
  deleteCB: (id: number) => Promise<void>;
}) => {
  const { tx, formatter, mapIdtoName, deleteCB } = props;
  const { t } = useTranslation();
  return (
    <div
      key={tx.id}
      className="flex flex-col gap-2 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg m-4"
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
      <div className="flex w-full justify-between">
        <p className="dark:text-white text-xl">
          {t("For")}: {tx.for.map((u) => mapIdtoName(u)).join(", ")}
        </p>
        <button
          className="rounded px-3 py-2 bg-amber-700 dark:bg-amber-600 text-white"
          onClick={() => deleteCB(tx.id)}
        >
          <ArchiveBoxXMarkIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default TransactionCard;
