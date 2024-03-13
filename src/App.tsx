import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router/route";
import { useContext, useEffect } from "react";
import { ThemeContext } from "./context/theme";

function App() {
  const currentTheme = useContext(ThemeContext);
  useEffect(() => {
    if (currentTheme.theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [currentTheme]);
  return (
    <div
      className={`h-full overflow-y-hide no-scrollbar w-full mx-auto ${
        currentTheme.theme === "dark" ? "dark" : ""
      }`}
    >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
