import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css";
import Footer from "../components/Footer";
import { AuthContent } from "../contexts/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";
import Menu from "../../src/Pages/Shop/Menu";

const Main = () => {
  //this is to show when the url is loading
  const { loading } = useContext(AuthContent);

  return (
    <div className="bg-prigmayBG">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
        <Navbar />
        <div className="min-h-screen" >
        <Outlet />
        </div>
        <Footer />
      </div>
      )}
       
    </div>
  );
}

export default Main;
