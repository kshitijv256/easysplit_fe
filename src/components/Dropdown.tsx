import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

/* eslint-disable @typescript-eslint/no-explicit-any */
const list = [
  {
    name: "English",
    locale: "en",
  },
  {
    name: "Spanish",
    locale: "es",
  },
  {
    name: "French",
    locale: "fr",
  },
];

export default function DropDown() {
  const [selected, setSelected] = useState<string>();
  const [show, setShow] = useState(false);
  const { i18n } = useTranslation();

  useEffect(() => {
    const locale = localStorage.getItem("locale");
    setSelected(locale || "en");
  }, []);

  useEffect(() => {
    if (selected) {
      i18n.changeLanguage(selected);
      localStorage.setItem("locale", selected);
    }
  }, [i18n, selected]);

  return (
    <div className="relative">
      <button
        onClick={() => setShow(!show)}
        className="text-white bg-amber-700 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-md text-sm px-4 py-2 text-center inline-flex items-center dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800"
        type="button"
      >
        {selected}{" "}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <div
        className={`${
          show ? "" : "hidden"
        } absolute top-12 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          {list.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  setSelected(item.locale);
                  setShow(false);
                }}
              >
                <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  {item.name}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
