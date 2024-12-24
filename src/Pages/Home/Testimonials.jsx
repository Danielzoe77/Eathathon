import React from "react";
import chef from "../../assets/chef 1.png";
import user1 from "../../assets/user-1.png";
import user2 from "../../assets/user-2.png";
import user3 from "../../assets/user-3.png";
import { FaStar } from "react-icons/fa";

const Testimonials = () => {
  return (
    <div className="section-container">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12 ">
        <div className="md:w-1/2">
          <img src={chef} />
        </div>
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="subtitle">Testimonials</p>
            <h2 className="title ">What Our customers say about us</h2>
            <blockquote className="my-5 text-secondary leading-[30px]">
              "I has the pleasure of dining at foodi last night, and I must say
              that I was completely blown away by the quality of the food and
              the service. The food was delicious, the presentation was
              beautiful, and the staff was friendly and attentive."
            </blockquote>

            {/* avatar plugins */}
            <div className="flex items-center gap-4 flex-wrap">
            <div className="avatar-group -space-x-6 rtl:space-x-reverse">
              <div className="avatar">
                <div className="w-12">
                <img src={user1} />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                <img src={user2} />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                <img src={user3} />
                </div>
              </div>
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content w-12">
                  <span>+99</span>
                </div>
              </div>
            </div>
                
            <div className="space-y-1">
            <h5 className="text-lg font-semibold ">Customers Feedback</h5>
                <div className="flex items-center gap-2">
                <FaStar className = "text-yellow-400" />
                <span className="font-medium">4.9</span> <span className="text-[#807e7e]">(18.6k Reviews)</span>
                </div>
            </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
