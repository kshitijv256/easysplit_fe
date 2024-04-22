/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import Appbar from "../../components/AppBar";
// import AddUserModal from "./AddUserModal";
import { loadFromLocalStorage } from "../../util";
import { useTranslation } from "react-i18next";
import { fetchUsers } from "../../utils/api";
import { User } from "../../types/user";

const updateUsers = async (
  setUsersCB: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const user = await loadFromLocalStorage("userData");
  const usersList = await fetchUsers(user.groupId).then((res) => res.json());
  setUsersCB(usersList);
};

const Users = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    updateUsers(setUsers);
  }, []);

  return (
    <div className="dark:bg-gray-800 h-full">
      <Appbar />
      <div className="flex w-full px-6 py-2 justify-between">
        <h2 className="text-2xl font-bold dark:text-white">
          {t("Users list")}
        </h2>
        {/* <button
          onClick={() => {
            setOpen(true);
          }}
          className="bg-amber-400 dark:bg-amber-600 text-white px-4 py-2 rounded shadow-md"
        >
          {t("Add User")}
        </button> */}
      </div>
      <ul className="p-6">
        {users.map((user: any, index: number) => {
          return (
            <li key={index} className="dark:text-white list-disc text-xl">
              {user.firstName + " " + user.lastName}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Users;
