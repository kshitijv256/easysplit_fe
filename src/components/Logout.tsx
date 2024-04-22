import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/user";

const Logout = () => {
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    setUser(null);
    localStorage.removeItem("userData");
  }, []);

  return <Navigate to="/signin" />;
};

export default Logout;
