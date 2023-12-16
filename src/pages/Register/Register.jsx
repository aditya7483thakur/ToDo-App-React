import { Link, Navigate, useNavigate } from "react-router-dom";
import "../Login/Login.css";
import { useContext, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { server } from "../../App";
import { context } from "../../context/context";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(context);
  const navigate = useNavigate();
  const name = useRef();
  const email = useRef();
  const password = useRef();

  const signup = async () => {
    try {
      const userData = {
        name: name.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      toast.loading("signing up");
      const response = await fetch(`${server}/users/new`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const json = await response.json();

      toast.dismiss();

      if (json.success) {
        toast.success(json.message);
        setIsAuthenticated(true);
      } else {
        toast.error(json.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error("Some erroor occured !");
    }
  };

  if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    <div className="outer-form-div">
      <div className="form">
        <h1>Sign Up</h1>
        <input
          className="input"
          type="text"
          placeholder="Enter your Name"
          ref={name}
        />
        <input
          className="input"
          type="email"
          placeholder="Enter your Email"
          ref={email}
        />
        <input
          className="input"
          type="password"
          placeholder="Enter your Password"
          ref={password}
        />
        <button className="login" onClick={signup}>
          Sign Up
        </button>
        <p className="para">
          Already Registered ? <Link to="/login"> Log In</Link>
        </p>
      </div>
    </div>
  );
};
export default Register;
