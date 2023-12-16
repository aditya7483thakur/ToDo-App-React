import { useContext } from "react";
import { context } from "../../context/context";
import { Navigate } from "react-router-dom";
import "./Profile.css";
const Profile = () => {
  const { user, isAuthenticated } = useContext(context);

  if (!isAuthenticated) return <Navigate to={"/login"} />;
  return (
    <div class="user-info-container">
      <div class="user-info">Name : {user.name}</div>
      <br />
      <div class="user-info">Email : {user.email}</div>
    </div>
  );
};
export default Profile;
