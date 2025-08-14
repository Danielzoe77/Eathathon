import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContent } from "../contexts/AuthProvider";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signUpwithGmail, login } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [errorMessage, setErrorMessage] = useState("");

  //redirect to home page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    //console.log(email,password)
    login(email, password)
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: data.name,
          email: data.email,
        };
        //the below code is to help get user details and stores/post it in the database using this route
        axiosPublic
          .post("/users", userInfo)
          .then((res) => {
            // console.log(res.data);
            alert("signup successful");
            // document.getElementById("my_modal_5").close();
            //this is to help redirect to the hpme page and because we are using modal close we had to include it here
            navigate(from, { replace: true });
          })
          // .catch((error) => {
          //   const errorCode = error.code;
          //   const errorMessage = error.message;
          // });
        // alert("Login successful");

        // //this is to help redirect to the hpme page and because we are using modal close we had to include it here
        // document.getElementById("my_modal_5").close();
        // navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage("Provide a correct email and password!");
      });
      //reset()
  };

  //google signin
  //the formal code without database
  // const handleLogin = () => {
  //   signUpwithGmail()
  //     .then((result) => {
  //       const user = result.user;
  //       alert("Login successfully");

  //       //this is to help redirect to the hpme page and because we are using modal close we had to include it here
  //       document.getElementById("my_modal_5").close();
  //       navigate(from, { replace: true });
  //     })
  //     .catch((error) => console.log(error));
  // };

  const handleLogin = () => {
    signUpwithGmail()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          //this is to check if result then user then get display name
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        //the below code is to help get user details and stores/post it in the database using this route
        axiosPublic.post("/users", userInfo).then((res) => {
          // console.log(res.data);
          alert("signup successful");
        document.getElementById("my_modal_5").close();
          //this is to help redirect to the hpme page and because we are using modal close we had to include it here
          navigate('/');
        });
        // alert("signup successfully");

        // //this is to help redirect to the hpme page and because we are using modal close we had to include it here
        // document.getElementById("my_modal_5").close();
        // navigate(from, { replace: true });
      })
      .catch((error) => console.log(error));
  };

  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <div className="modal-action flex flex-col justify-center mt-0">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body"
            method="dialog"
          >
            <h3 className="font-bold text-lg">Please Login</h3>

            {/* email */}
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
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password")}
              />
              <label className="label mt-1">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* error text */}

            {errorMessage ? (
              <p className="text-red text-xs itallic">{errorMessage}</p>
            ) : (
              ""
            )}

            {/* login button */}
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Login"
                className="btn bg-green text-white"
              />
            </div>
            <p className="my-2 text-center">
              Do not have an account?{" "}
              <Link to="/signup" className="underline ml-1 text-red">
                {" "}
                Sign up
              </Link>
            </p>
            <button
              htmLfor="my_modal_5"
              onClick={() => document.getElementById("my_modal_5").close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>

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
    </dialog>
  );
};

export default Login;
