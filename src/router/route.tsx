import React, { Suspense } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import Users from "../pages/users/Users";
import Transactions from "../pages/transactions/Transactions";
import Dashboard from "../pages/Dashboard";
import SigninPage from "../pages/users/SigninPage";
import LoginPage from "../pages/users/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/signin",
    element: (
      <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
        <SigninPage />
      </Suspense>
    ),
  },
  //   {
  //     path: "/logout",
  //     element: <Logout />,
  //   },
  {
    path: "users",
    element: <Users />,
  },
  {
    path: "transactions",
    element: <Transactions />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);
export default router;
