import React, { Suspense } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import Users from "../pages/users/Users";
import Transactions from "../pages/transactions/Transactions";
import Dashboard from "../pages/Dashboard";
import SigninPage from "../pages/users/SigninPage";
import LoginPage from "../pages/users/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import Logout from "../components/Logout";

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
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "users",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <Users />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "transactions",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <Transactions />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <Dashboard />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);
export default router;
