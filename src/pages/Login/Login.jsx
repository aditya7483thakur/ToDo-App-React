import { useContext, useRef } from "react";
import "./Login.css";
import { Link, Navigate } from "react-router-dom";
import { server } from "../../App";
import toast from "react-hot-toast";
import { context } from "../../context/context";

const Login = () => {
  const email = useRef();
  const password = useRef();

  const { isAuthenticated, setIsAuthenticated } = useContext(context);

  const login = async () => {
    try {
      const userData = {
        email: email.current.value,
        password: password.current.value,
      };

      toast.loading("Logging In..");
      const response = await fetch(`${server}/users/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const json = await response.json();

      toast.dismiss();

      if (!json.success) {
        toast.error(json.message);
        setIsAuthenticated(false);
      } else {
        toast.success(json.message);
        setIsAuthenticated(true);
      }
    } catch (error) {
      toast.error("Some erroor occured !");
    }
  };

  if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    <div className="outer-form-div">
      <div className="form">
        <h1>Login</h1>
        <input
          className="input"
          type="text"
          placeholder="Enter your Email"
          name="email"
          ref={email}
        />
        <input
          className="input"
          type="password"
          placeholder="Enter your Password"
          ref={password}
        />
        <button className="login" onClick={login}>
          Login
        </button>
        <p className="para">
          Not Logged In ? <Link to="/register"> Register</Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
