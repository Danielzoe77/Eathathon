import React from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { FaUtensils } from 'react-icons/fa';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const UpdateMenu = () => {
    const item = useLoaderData();
    const { register, handleSubmit, reset} = useForm()
      const axiosPublic = useAxiosPublic();
      const axiosSecure = useAxiosSecure();
      const navigate = useNavigate();
    
      // add image uploader iMGBB KEY
    const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    // console.log(img_hosting_key)
    const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`
    
      const onSubmit = async (data) => {
        //console.log(data)
        // const imgFile = {image: data.image[0] }
        const imgFile = {image: data.image[0]}
          const hostingImage = await axiosPublic.post(img_hosting_api, imgFile,{
            headers :{ 
              "content-type" : "multipart/form-data"
            }
          })
         // console.log(hostingImage)
         if(hostingImage.data.success){
          // console.log(hostingImage.data.data.url)
          const newMenu = {
            name: data.name,
            category: data.category,
            price: parseFloat(data.price),
            recipe: data.recipe,
            image: hostingImage.data.data.url
          }
          // console.log(newMenu)
          const postMenu = await axiosSecure.patch(`/menu/${item._id}`, newMenu)
          if(postMenu.status === 200){
            reset();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Menu Item Updated Successfully',
              showConfirmButton: false,
              timer: 1500
            });
            navigate('/dashboard/manage-items')

          }

    
         }
         };
  return (
  
        <div className="w-full md:w-[870px] mx-auto px-4">
            <h2 className="text-2xl my-4 font-semibold">
              Update this <span className="text-green">Menu Item</span>{" "}
            </h2>
      
            {/* form here */}
      
            <div>
              <form  onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full my-8">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Recipie Name*</legend>
                    <input
                      type="text"
                      defaultValue={item.name}
                      {...register("name", { required: true })}
                      className="input input-bordered w-full"
                      placeholder="Recipe Name"
                    />
                  </fieldset>
                </div>
      
                {/* 2nd row */}
                <div className="flex  items-center gap-3">
                  <div className="form-control w-1/2">
                    <fieldset>
                      <legend className="fieldset-legend"> Category*</legend>
                      <select
                        defaultValue={item.category}
                       {...register("category", { required: true })}
                        // defaultValue="select a category"
                        className="select w-full  border border-gray-300 "
                      >
                        <option value="default" disabled >Select a Catgory</option>
                        <option value="salad">Salad</option>
                        <option value="pizza">Pizza</option>
                        <option value="soup">Soup</option>
                        <option value="dessert">Dessert</option>
                        <option value="drinks">Drinks</option>
                        <option value="popular">Popular</option>
                      </select>
                    </fieldset>
                  </div>
                  <div className="form-control w-1/2">
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">Price*</legend>
                      <input
                        type="number"
                         step="any"
                        defaultValue={item.price}
                        {...register("price", { required: true })}
                        className="input input-bordered w-full"
                        placeholder="Price"
                      />
                    </fieldset>
                  </div>
                </div>
      
                {/* 3rd row */}
      
                <div className="form-control w-full my-8">
                  <fieldset>
                    <legend className="fieldset-legend">Receipe Details*</legend>
                    <textarea
                      defaultValue={item.recipe}
                     {...register("recipe", { required: true })}
                      className=" border border-gray-300 rounded-md p-4 w-full textarea h-24"
                      placeholder="Tell us about the recipe" 
                    ></textarea>
                  </fieldset>
                </div>
      
      
                {/* 4th row */}
      
                <div className="form-control w-full my-8">
                    <input
                     {...register("image", { required: true })}
                      type="file"
                    className="file-input w-full p-1 max-w-xs "
                      placeholder="Image"
                    />
               
                </div>
                
            <button className="btn px-6 bg-green text-white"> Update Menu <FaUtensils /></button>
              </form>
            </div>
      
          </div>

  )
}

export default UpdateMenu
