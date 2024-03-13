// A modal to add user

import React, { useState, useContext } from "react";
import { ThemeContext } from "../../context/theme";
import { loadFromLocalStorage, saveToLocalStorage } from "../../util";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const theme = useContext(ThemeContext);

  const handleSubmit = async () => {
    setLoading(true);
    const users = await loadFromLocalStorage("users");
    users.push({ name, email });
    saveToLocalStorage("users", users);
    setLoading(false);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded-lg p-8 w-96 ${
          theme.theme === "dark" ? "text-white" : ""
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Add User</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:text-white dark:bg-gray-700 p-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:text-white dark:bg-gray-700 p-2"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 dark:text-gray-400 mr-4"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-amber-400 dark:bg-amber-600 text-white px-4 py-2 rounded-md "
              disabled={loading}
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
