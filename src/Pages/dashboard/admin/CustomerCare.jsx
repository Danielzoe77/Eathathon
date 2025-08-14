

import image from "../../../../src/assets/DANIEL OMOANON.png"


import React from 'react';
import { FaEnvelope, FaLinkedin, FaPhone, FaGithub} from 'react-icons/fa';

const CustomerCare = () => {
  const customer = {
    name: "Jane Doe",
    designation: "Customer Care Specialist",
    email: "drimbignation@gmail.com",
    linkedin: "https://www.linkedin.com/in/daniel-omoanon",
    github : "https://github.com/Danielzoe77",
    phone: "+234 905 045 4468, +234 913 370 0265 ",
    image: {image},
  };

  return (
    
      <div className="hero min-h-[110vh]">
        <div className="hero-content text-center p-10  bg-gray-100 shadow-md rounded-2xl">
          <img
            src={image}
            className="w-60 h-60 rounded-full object-cover "
          />
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold">Daniel Omoanon</h1>
            <h3 className="text-base text-gray-500">FullStack Developer</h3>
            <p className="py-2">
              Highly motivated Full Stack Developer with three years of
              experience building robust, scalable web applications using React,
              JavaScript, Node.js, Express.js, MySQL, MongoDB, and Vite.js.
              Adept at both front-end and back-end development, with hands-on
              experience delivering real-world solutions for startups.
            </p>
            <div className="px-6  py-1  items-center flex flex-row space-x-2">
              <FaEnvelope className=" w-6 h-6  text-green" />
              <a
                href={`mailto:${customer.email}`}
                className="hover:underline mr-4"
              >
                {customer.email}
              </a>
            </div>

            <div className="flex py-1  px-6 items-center text-base text-gray-700 space-x-2 ">
              <FaLinkedin className="w-6 h-6 text-green" />
              <a
                href={customer.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                LinkedIn Profile
              </a>
            </div>
             <div className="flex py-1  px-6 items-center text-base text-gray-700 space-x-2 ">
              <FaGithub className="w-6 h-6 text-green" />
              <a
                href={customer.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Github Profile
              </a>
            </div>

            <div className="flex  px-6 py-1 items-center text-base text-gray-700 space-x-2 mb-2">
              <FaPhone className="w-4 h-4 text-green" />
              <span>{customer.phone}</span>
            </div>

            {/* <button className="btn btn-primary">Get Started</button> */}
          </div>
        </div>
      </div>


    
  );
};

export default CustomerCare;
