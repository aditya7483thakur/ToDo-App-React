import { useContext } from "react";
import "./Navbar.css";
import { context } from "../../context/context";
import { Link } from "react-router-dom";
import { server } from "../../App";
import toast from "react-hot-toast";

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(context);

  const logout = async () => {
    // try {
    //   toast.loading("Logging Out..");
    //   const response = await fetch(`${server}/users/logout`, {
    //     method: "GET",
    //     credentials: "include",
    //   });

    //   const json = await response.json();
    //   console.log(json);
    //   toast.dismiss();
    //   if (json.success) {
    //     toast.success(json.message);
    //     setIsAuthenticated(false);
    //   } else {
    //     toast.error("Some error occured !");
    //     setIsAuthenticated(true);
    //   }
    // } catch (error) {
    //   toast.success("Some error occured !");
    //   setIsAuthenticated(true);
    // }

    toast.loading("Logging Out...");
    fetch(`${server}/users/logout`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((json) => {
        toast.dismiss();
        toast.success(json.message);
        setIsAuthenticated(false);
      })
      .catch((e) => {
        setIsAuthenticated(true);
        toast.error(e);
      });
  };

  return (
    <nav>
      <div className="logo">ToDo App</div>
      <div className="nav-items">
        <Link className="nav-login-btn" to={"/"}>
          <li>Home</li>
        </Link>
        <Link className="nav-login-btn" to={"/profile"}>
          <li>Profile</li>
        </Link>
        {isAuthenticated ? (
          <li onClick={logout}>Logout</li>
        ) : (
          <Link className="nav-login-btn" to={"/login"}>
            <li>Login</li>
          </Link>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
