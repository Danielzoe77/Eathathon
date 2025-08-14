import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa6";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import Login from "./Login";
import { AuthContent } from "../contexts/AuthProvider";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); //when u use useForm() it returns an object and we destructure it(data)

  const { creatUser, signUpwithGmail, updateUserProfile } =
    useContext(AuthContent);
  const axiosPublic = useAxiosPublic();

  //redirect to home page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    // console.log(data);
    creatUser(email, password)
      .then((result) => {
        // Signed in
        const user = result.user;
        //once a user is created we need to log them in and immediately their profile is updated
        updateUserProfile(data.name, data.photoURL).then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          //the below code is to help get user details and stores/post it in the database using this route
          axiosPublic
            .post("/users", userInfo)
            .then((res) => {
              //console.log(res.data);
              alert("signup dbn");
              document.getElementById("my_modal_5").close();
              //this is to help redirect to the hpme page and because we are using modal close we had to include it here
              navigate(from, { replace: true });
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
            });
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  //google signin
  const handleLogin = () => {
    signUpwithGmail()
      .then((result) => {
        const user = result.user;
        // console.log(user);
        const userInfo = {
          //this is to check if result then user then get display name
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        //the below code is to help get user details and stores/post it in the database using this route
        axiosPublic
          .post("/users", userInfo)
          .then((res) => {
            // console.log(res.data);
            alert("signup successful");
            document.getElementById("my_modal_5").close();
            //this is to help redirect to the hpme page and because we are using modal close we had to include it here
            navigate(from, { replace: true });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
        // alert("signup successfully");

        // //this is to help redirect to the hpme page and because we are using modal close we had to include it here
        // document.getElementById("my_modal_5").close();
        // navigate(from, { replace: true });
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="max-w-md bg-white shadow w-full mx-auto items-center justify-center my-20 flex ">
      <div className="modal-action flex flex-col justify-center mt-0">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body"
          method="dialog"
        >
          <h3 className="font-bold text-lg">Create Account</h3>
          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="name"
              className="input input-bordered"
              required
              {...register("name")}
            />
          </div>

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

          {/* login button */}
          <div className="form-control mt-6">
            <input
              type="submit"
              value="Signup"
              className="btn bg-green text-white"
            />
          </div>
          <p className="my-2 text-center">
            Already have an Account{" "}
            <Link to="/login" className="underline ml-1 text-red">
              Login
            </Link>
          </p>
          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </Link>
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
      <Modal />
    </div>
  );
};

export default Signup;
