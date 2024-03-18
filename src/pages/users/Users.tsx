/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import Appbar from "../../components/AppBar";
import AddUserModal from "./AddUserModal";
import { loadFromLocalStorage } from "../../util";
import { useTranslation } from "react-i18next";

const updateUsers = async (
  setUsersCB: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const usersList = await loadFromLocalStorage("users");
  setUsersCB(usersList);
};

const Users = () => {
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = React.useState<any[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    updateUsers(setUsers);
  }, [open]);
  return (
    <div className="dark:bg-gray-800 h-full">
      <Appbar />
      <div className="flex w-full px-6 py-2 justify-between">
        <h2 className="text-2xl font-bold dark:text-white">
          {t("Users list")}
        </h2>
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="bg-amber-400 dark:bg-amber-600 text-white px-4 py-2 rounded shadow-md"
        >
          {t("Add User")}
        </button>
      </div>
      <AddUserModal isOpen={open} onClose={() => setOpen(false)} />

      <ul className="p-6">
        {users.map((user: any, index: number) => {
          return (
            <li key={index} className="dark:text-white list-disc text-xl">
              {user.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Users;
