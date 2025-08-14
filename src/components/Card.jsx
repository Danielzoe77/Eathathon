import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { AuthContent } from "../contexts/AuthProvider";
import Swal from "sweetalert2";
import useCarts from "../hooks/useCarts";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const Card = ({ item }) => {
  const { name, image, price, recipe, _id } = item;
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [cart, refetch] = useCarts();
  // const [cartItems, setCartItems] = useState([]);

  //this is use to check if the user is logged in
  const { user } = useContext(AuthContent);
  // console.log(user)
  const navigate = useNavigate();
  const location = useLocation();

  // const handleAddtoCart = async (item) => {
  //   if (user && user?.email) {
  //     const cartItems = {
  //       menuItemId: _id,
  //       name,
  //       quantity: 1,
  //       image,
  //       price,
  //       recipe,
  //       email: user.email,
  //     };

  //     try {
  //       const response = await fetch("http://localhost:3000/carts", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(cartItems),
  //       });

  //       const data = await response.json();
  //        // Update the state with the new cart item
  //   // setCartItems((prevCartItems) => [...prevCartItems, data]);

  //       console.log(data);

  //       if (data.insertedId) {
  //         Swal.fire({
  //           position: "top-end",
  //           icon: "success",
  //           title: "Your work has been saved",
  //           showConfirmButton: false,
  //           timer: 2000,
  //         });
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   } else {
  //     Swal.fire({
  //       title: "Please login?",
  //       text: "Please Create an account or Login to add product!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Sign Up Now",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         navigate("/signup", { state: { from: location } });
  //       }
  //     });
  //   }
  // };

  const handleAddtoCart = async (item) => {
    // console.log('the btn is clicked', item)
    if (user && user?.email) {
      const cartItem = {
        menuItemId: _id,
        name,
        quantity: 1,
        image,
        price,
        recipe,
        email: user.email,
      };
      // console.log(cartItem)
      // fetch("http://localhost:3000/carts", {
       fetch("https://foodie-backend-umhd.onrender.com/carts", {
      // fetch(`${API_BASE_URL}/carts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          // Update the UI by calling refetch
         // refetch();
          //sweetAlert plugins
          if (data._id) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 2000,
            });
          }
          refetch()
        })
        
        .catch((error) => {
          if (error.response.status === 400){
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              footer: '<a href="#">Why do I have this issue?</a>'
            });
          }
        });
    }
    //this will show if a user is not logged in
    else {
      Swal.fire({
        title: "Please login?",
        text: "Please Create an account or Login to add product!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sign Up Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signup", { state: { from: location } });
        }
      });
    }
  };

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };
  return (
    // <div className="card bg-base-100 w-full shadow-xl relative">
    <div className="card bg-base-100 shadow-xl w-full max-w-sm mx-auto">

      <div
        className={`rating gap-1 absolute top-2 right-2 p-4 heartStar bg-green ${
          isHeartFilled ? "text-rose-500" : "text-white"
        } `}
        onClick={handleHeartClick}
      >
        <FaHeart className="h-5 w-5 cursor-pointer" />
        {/* <FaHeart className={isHeartFilled ? "text-red" : ""} onClick={handleHeartClick} /> */}
      </div>
      <Link to={`/menu/${item._id}`}>
        <figure>
          <img
            src={item.image}
            alt="Shoes"
            className="hover:scale-105 transition-all duration-200 md:h-72"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`/menu/${item._id}`}>
          {" "}
          <h2 className="card-title">{item.name}</h2>{" "}
        </Link>
        <p>Description of the item</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red">$</span>
            {item.price}
          </h5>
          <button
            className="btn bg-green text-white"
            onClick={() => handleAddtoCart(item)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
