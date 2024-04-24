/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import Appbar from "../../components/AppBar";
// import AddUserModal from "./AddUserModal";
import { loadFromLocalStorage } from "../../util";
import { useTranslation } from "react-i18next";
import { fetchUsers } from "../../utils/api";
import { User } from "../../types/user";
import { UserCircleIcon } from "@heroicons/react/24/outline";

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
    <div className="dark:bg-gray-800 h-full w-full flex flex-col items-center">
      <Appbar />
      <h2 className="flex text-2xl pt-4 font-bold dark:text-white items-center gap-2">
        <UserCircleIcon className="w-8 h-8 inline-block" /> {t("Users list")}
      </h2>
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
