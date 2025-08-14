import React from "react";
import { FaEdit, FaLocationArrow, FaPlusCircle, FaQuestionCircle, FaShoppingBag } from "react-icons/fa";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { MdDashboard, MdDashboardCustomize } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";
import logo from "../assets/food.png";
import Signup from "../components/Signup";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";

const sharedLinks = (
  <>
    <li className="">
      <Link to="/">
        <MdDashboard /> Home
      </Link>
    </li>

    <li className="">
      <Link to="/menu">
        <FaCartShopping /> Menu
      </Link>
    </li>

    <li className="">
      <Link to="/menu">
      {" "}
        <FaLocationArrow /> Orders tracking
      </Link>
    </li>

    <li className="">
      <Link to="/customer-care">
        <FaQuestionCircle /> Customers Support
      </Link>
    </li>
  </>
);

const DashboardLayout = () => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();

  // ✅ Show nothing (or a loader) while either check is loading
  if (loading || isAdminLoading) {
    return <div className="h-screen flex items-center justify-center"> <LoadingSpinner /></div>;
  }

  // ✅ Only show Signup if checks are complete AND user is not logged in
  if (!user || !isAdmin) {
    return <Signup />;
  }


  
  return (
    <div>
      
         {isAdmin ? (
          <div className="drawer sm:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
          {/* Page content here */}
          <div className="flex items-center justify-between mx-2">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              <MdDashboardCustomize />
            </label>
            <button className="btn bg-green text-white sm:hidden rounded-full px-6">
              Logout
            </button>
          </div>
          <div className="mt-5 md:mt-2 mx-4">
            <Outlet></Outlet>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}

            <li>
              <Link to="/dashboard" className="flex justify-start mb-3">
                <img src={logo} alt="logo" className="w-20 h-16" />
                <span className="badge badge-accent">Admin</span>
              </Link>
              <hr />
            </li>
            <li className="mt-3">
              <Link to="/dashboard">
                {" "}
                <MdDashboard /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/dashboard/manage-bookings">
                {" "}
                <FaShoppingBag /> Manage Bookings{" "}
              </Link>
            </li>
            <li>
              <Link to="/dashboard/add-menu">
                {" "}
                <FaPlusCircle /> Add Menu
              </Link>
            </li>
            <li>
              <Link to="/dashboard/manage-items">
                {" "}
                <FaEdit /> Manage Items
              </Link>
            </li>
            <li className="mb-3">
              <Link to="/dashboard/users">
                {" "}
                <FaUser />
                All Users
              </Link>
            </li>

            <hr />

            {/* shared links */}

            {
              sharedLinks
            }
          </ul>
        </div>
      </div>
         ) : (<Signup/> )
        }  
    </div>
  );
};

export default DashboardLayout;
