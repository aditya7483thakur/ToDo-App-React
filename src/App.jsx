import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Navbar/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import { context } from "./context/context";

// export const server = `http://localhost:4000`;
export const server = `https://to-do-backend-pfbi.onrender.com`;

function App() {
  const { isAuthenticated, setIsAuthenticated, setUser, user } =
    useContext(context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${server}/users/me`, {
          method: "GET",
          credentials: "include",
        });

        const json = await response.json();
        if (json.success) {
          setIsAuthenticated(true);
          setUser(json.user);
        } else {
          setIsAuthenticated(false);
          setUser({});
        }
      } catch (error) {
        toast.error("Some Error Occured !");
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <NavBar />
      <Outlet />
      <Toaster />
    </>
  );
}

export default App;
