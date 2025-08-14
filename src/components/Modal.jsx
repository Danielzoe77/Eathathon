import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGithub, FaGoogle, FaFacebookF } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Modal = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const { signUpwithGmail, login } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const { email, password, name } = data;
  
    login(email, password)
      .then((result) => {
        const userInfo = {
          name: name || result.user?.displayName || "Anonymous",
          email: result.user?.email,
        };
  
        // Send user info to backend
        axiosPublic.post("/users/login", userInfo)
          .then(() => {
            Swal.fire({
              title: "Success!",
              text: "Login successful",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
            
            onClose(); // Close the modal
            reset();
            navigate(from, { replace: true });
           
          })
          .catch((error) => {
            if (error.response?.data?.message === "User already exists") {
              // User already exists, ignore the error
              Swal.fire({
                title: "Success!",
                text: "welcome back",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
              })
              onClose(); // Close the modal
              reset();
              navigate(from, { replace: true });
            } else {
              // Handle other errors (like server issues)
              setErrorMessage("An error occurred. Please try again later.");
            }
          });
      })
      .catch((error) => {
        setErrorMessage("Invalid email or password.");
      });
  };
  

  const handleLogin = () => {
    signUpwithGmail()
      .then((result) => {
        const userInfo = {
          name: result.user?.displayName|| "Anonymous",
          email: result.user?.email,
        };

        axiosPublic.post("/users/login", userInfo).then(() => {
          Swal.fire({
            title: "Success!",
            text: "Signup successful",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
          // console.log("Closing modal...");
          onClose();
          reset();
          navigate(from, { replace: true });
          
        });
      })
         .catch((error) => {
            if (error.response?.data?.message === "User already exists") {
              // User already exists, ignore the error
              Swal.fire({
                title: "Success!",
                text: "Login successful",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
              })
              onClose(); // Close the modal
              navigate(from, { replace: true });
            } else {
              // Handle other errors (like server issues)
              setErrorMessage("An error occurred. Please try again later.");
            }
          });
  };

  

  return (
    <div className={`modal modal-middle sm:modal-middle ${isOpen ? "modal-open" : ""}`}>

      <div className="modal-box">
        <div className="modal-action flex flex-col justify-center mt-0">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <h3 className="font-bold text-lg">Please Login</h3>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
                {...register("email")}
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
                {...register("password")}
              />
              <label className="label mt-1">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="text-red-500 text-xs italic mt-2">{errorMessage}</p>
            )}

            {/* Submit Button */}
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Login"
                className="btn bg-green text-white"
              />
            </div>

            {/* Redirect to Signup */}
            <p className="my-2 text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="underline ml-1 text-red">
                Sign up
              </Link>
            </p>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>

          {/* Social Logins */}
          <div className="text-center mb-2 space-x-3">
            <button
              className="btn btn-circle hover:bg-green hover:text-white"
              onClick={handleLogin}
            >
              <FaGoogle />
            </button>
            <button className="btn btn-circle hover:bg-green hover:text-white">
              <FaFacebookF />
            </button>
            <button className="btn btn-circle hover:bg-green hover:text-white">
              <FaGithub />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
