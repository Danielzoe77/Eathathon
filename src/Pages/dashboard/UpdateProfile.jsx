import React, { useContext } from "react";
import { useForm } from "react-hook-form";

import { AuthContent } from "../../contexts/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const { updateUserProfile } = useContext(AuthContent);
  const {
    register,
    handleSubmit,
   
    formState: { errors },
  } = useForm();

const location = useLocation();
const navigate = useNavigate();
const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const name = data.name;
    const photoURL = data.photoURL;
   updateUserProfile({ displayName: name, photoURL: photoURL })
    .then(()=>{
        console.log("Profile updated successfully!");
        navigate(from, { replace: true });
    }).catch((error)=>{
        console.error("Error updating profile:", error);
    })
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold">Update Profile</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="your name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Upload Photo</span>
            </label>

            {/* this is to upload a photo using a link */}
            <input
              {...register("photoURL")}
              type="text"
              placeholder="photoURL"
              className="input input-bordered"
              required
            />
            {/* this is to upload a photo using backend node js */}
            {/* <input type="file" className="file-input w-full max-w-xs" /> */}
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-green text-white">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
