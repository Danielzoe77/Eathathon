import React, { useContext } from "react";
import { AuthContent } from "../contexts/AuthProvider";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Profile = ({ user }) => {
  const { logOut, setUser } = useContext(AuthContent);
const navigate = useNavigate();
const location = useLocation();


//logout functions
const handleLogout = () => {
 
  logOut()
    .then(() => {
      // <Navigate to="/menu" state={{from: location}} replace></Navigate>
      // navigate('/menu', { state: { from: location }, replace: true })
      navigate(location.pathname, { replace: true });
   //user
   setUser(null)
      
    })
    .catch((error) => {
     console.error(error);
    });
};
  return (
    <div>
      <div className="drawer drawer-end z-40 ">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* this makes the profile pictur round */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-ghost btn-circle avatar "
          >
            <div className="w-10 rounded-full">
                {/* this code below is to show that if a user logged doesnt ve a profilepics replace with avatar */}
                {
                    user.photoURL ? <img
                    alt="Tailwind CSS Navbar component"
                    src={user.photoURL}
                  /> :  <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                }
              
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <a href="/update-profile">Profile</a>
            </li>
            <li>
              <a href="/order">Order</a>
            </li>
            <li>
              <a>Setting</a>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link> 
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
