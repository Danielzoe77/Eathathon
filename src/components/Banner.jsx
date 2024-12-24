import React from "react";
import eat from "../assets/eat.png";
import foodar from "../assets/foodar.png";

const Banner = () => {
  return (
    <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%   ">
      <div className="py-24 flex flex-col md:flex-row-reverse justify-between items-center gap-8">
{/* image */}
      <div className="md:w-1/2 mx-auto">
          <img src={eat} className="w-[400] h-[200]" alt="" />
          <div className="flex flex-col md:flex-row items-center justify-around -mt-24 gap-4  ">
            <div className="flex shadow-sm w-64 items-center rounded-2xl  bg-white py-2 px-3 gap-3">
              <img src={foodar} className=" w-20 h-20" alt="" />
              <div className="space-y-2">
              <h5 className="font-medium mb-2">Spicy Meat</h5>
              <div className="rating rating-sm">
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-yellow-500"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-yellow-500"
                  defaultChecked
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-yellow-500"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-yellow-500"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-yellow-500"
                />
              </div>
              <p className="text-red">$15</p>
              </div>
            </div>
            <div className="sm:flex hidden shadow-sm w-64  items-center rounded-2xl  bg-white py-2 px-3 gap-3">
              <img src={foodar} className=" w-20 h-20" alt="" />
              <div className="space-y-2">
              <h5 className="font-medium mb-2">Spicy Meat</h5>
              <div className="rating rating-sm">
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-yellow-500"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-yellow-500"
                  defaultChecked
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-yellow-500"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-yellow-500"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-yellow-500"
                />
              </div>
              <p className="text-red">$15</p>
              </div>
            </div>
          </div>
          <div></div>
        </div>


        {/* text   */}
        <div className="md:w-1/2 space-y-7 px-4">
          <h2 className="text-4xl leading-snug md:text-5xl  md:leading-snug font-bold">
            Dive into Delit of delicate{" "}
            <span className="text-green  "> Food</span>
          </h2>
          <p className="text-xl text-[#4a4a4a]">
            {" "}
            Where Each Plate Waves a story of culinary Mastery and Passionate
            CraftManship
          </p>

          <button className="btn bg-green px-8 py-4 font-semibold text-white rounded-full">
            Order Now
          </button>
        </div>

    
       
      </div>
    </div>
  );
};

export default Banner;
