import { Fragment, useContext, useEffect, useState } from "react";
import { Disclosure, Menu, Switch, Transition } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
// import Logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../context/theme";
import { useTranslation } from "react-i18next";
import DropDown from "./Dropdown";
import { loadFromLocalStorage } from "../util";
import { UserContext } from "../context/user";

const userNavigation = [
  { name: "Log out", href: "/logout" },
  { name: "Reset password", href: "/reset" },
];

const classNames = (...classes: string[]): string =>
  classes.filter(Boolean).join(" ");

const navigation = [
  { name: "Dashboard", href: "/dashboard", current: false },
  { name: "Users", href: "/users", current: false },
  { name: "Transactions", href: "/transactions", current: false },
  //   { name: "Signup", href: "/signup", current: false },
  //   { name: "Signin", href: "/signin", current: false },
];

const Appbar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const [enabled, setEnabled] = useState(theme == "dark" ? true : false);
  const { pathname } = useLocation();
  const [auth, setAuth] = useState(false);
  const [nav, setNav] = useState(navigation);
  const { t } = useTranslation();

  const checkAuth = async () => {
    const user = await loadFromLocalStorage("userData");
    if (user.id) {
      setAuth(true);
      setNav(navigation);
    } else {
      setAuth(false);
      setNav([]);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [user]);

  const toggleTheme = () => {
    let newTheme = "";
    if (theme === "light") {
      newTheme = "dark";
    } else {
      newTheme = "light";
    }
    setEnabled((prev) => !prev);
    setTheme(newTheme);
  };

  return (
    <>
      <Disclosure
        as="nav"
        className="border-b border-gray-200 
        dark:border-gray-700 
        bg-gradient-to-tr from-white via-white to-amber-300 
        dark:from-gray-800 dark:via-gray-800 dark:to-amber-800
        w-full
        "
      >
        {({ open }) => (
          <div className="mx-auto px-4 sm:px-6 lg:px-4 py-2">
            {open && (
              <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-gray-700 divide-y-2 divide-amber-500 dark:dividde-amber-300 ">
                  <div className="pt-3 pb-2 px-5">
                    <div className="flex items-center justify-between">
                      <Link to={"/"}>
                        {/* <img
                          className="h-12 w-auto"
                          src={Logo}
                          alt="Sports News"
                        /> */}
                        Logo
                      </Link>
                      {/* <h1 className="text-2xl font-bold text-amber-600">
                        Navigation
                      </h1> */}
                      <div className="-mr-2">
                        <Disclosure.Button className="bg-white dark:bg-gray-600 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-amber-600 dark:hover:text-amber-500 hover:bg-gray-100 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-600">
                          <span className="sr-only">Close menu</span>
                          {/* <!-- Heroicon name: outline/x --> */}
                          <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </Disclosure.Button>
                      </div>
                    </div>
                  </div>
                  <div className="py-6 px-5 space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                      {nav.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="text-base font-medium text-gray-900 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500"
                        >
                          {t(item.name)}
                        </Link>
                      ))}
                    </div>
                    {/* {auth && (
                      <button
                        onClick={() => setIsOpen(true)}
                        className="text-gray-900 dark:text-gray-300"
                      >
                        Preferences
                      </button>
                    )} */}
                    <div className="flex gap-2">
                      <span className="text-gray-900 dark:text-gray-300">
                        {t("DarkMode")}{" "}
                      </span>
                      <Switch
                        checked={enabled}
                        onChange={toggleTheme}
                        className={`${enabled ? "bg-amber-600" : "bg-gray-700"}
              relative inline-flex h-[24px] w-[60px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                      >
                        <span className="sr-only">Use setting</span>
                        <span
                          aria-hidden="true"
                          className={`${
                            enabled ? "translate-x-9" : "translate-x-0"
                          }
                pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white dark:bg-gray-300 shadow-lg ring-0 transition duration-200 ease-in-out`}
                        />
                      </Switch>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="flex h-10 items-center justify-between">
              <div className="flex items-center justify-between w-full">
                <div className="flex-shrink-0">
                  <Link to={"/"}>
                    {/* <img className="h-16 w-auto" src={Logo} alt="Sports News" /> */}
                    Logo
                  </Link>
                  {/* <h1 className="text-2xl font-bold text-amber-600">
                    Need Logo
                  </h1> */}
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <DropDown />
                    {nav.map((item) => {
                      const isCurrent = pathname.includes(item.href);
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            isCurrent
                              ? "bg-gray-50 dark:bg-gray-700 text-amber-700 dark:text-amber-500"
                              : "text-gray-500 dark:text-gray-300 dark:hover:text-amber-600 hover:text-amber-600",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={isCurrent ? "page" : undefined}
                        >
                          {t(item.name)}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center gap-2 md:ml-6">
                  <span className="text-gray-500 dark:text-gray-300 font-medium text-sm">
                    {t("DarkMode")}
                  </span>
                  <Switch
                    checked={enabled}
                    onChange={toggleTheme}
                    className={`${enabled ? "bg-amber-600" : "bg-gray-700"}
              relative inline-flex h-[24px] w-[60px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className={`${enabled ? "translate-x-9" : "translate-x-0"}
                pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white dark:bg-gray-300 shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                  {auth ? (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button
                          className="rounded-full bg-white p-1 text-gray-400 hover:text-amber-600 
                                    dark:bg-gray-600 dark:text-gray-300 dark:hover:text-amber-500"
                        >
                          <UserCircleIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-300 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active
                                      ? "bg-gray-200/50 dark:bg-gray-600/50"
                                      : "",
                                    "w-full text-left block px-4 py-2 text-sm"
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                          {/* <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => setIsOpen(true)}
                                className={classNames(
                                  active
                                    ? "bg-gray-200/50 dark:bg-gray-600/50"
                                    : "",
                                  "w-full text-left block px-4 py-2 text-sm"
                                )}
                              >
                                Preferences
                              </button>
                            )}
                          </Menu.Item> */}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* <!-- Mobile menu button --> */}
                <Disclosure.Button className="bg-white dark:bg-gray-600 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-amber-600 dark:hover:text-amber-500 hover:bg-gray-100 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-600">
                  <span className="sr-only">Open main menu</span>
                  {/* <!-- Heroicon name: outline/menu --> */}
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </Disclosure.Button>
              </div>
            </div>
          </div>
        )}
      </Disclosure>
    </>
  );
};

export default Appbar;
