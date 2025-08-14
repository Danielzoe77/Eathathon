import React, { useContext } from "react";
import useCarts from "../hooks/useCarts";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContent } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CartPage = () => {
  //upadating the cart section with what has been selected
  const [cart, refetch] = useCarts();
  // console.log(cart)

  //calculate total price
  const calculateTotal = (item) => {
    return item.price * item.quantity;
  };

  const { user } = useContext(AuthContent);
  // handle decrease function
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      // fetch(`http://localhost:3000/carts/${item._id}`, {
        fetch(`https://foodie-backend-umhd.onrender.com//carts/${item._id}`, {
      // fetch(`${API_BASE_URL}/carts/${item._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ quantity: item.quantity - 1 }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount > 0) {
            refetch();
          }
          refetch();
        });
    } else {
      //modify it to show item cant be zero
      // handleDelete(item)
      alert("item cant be zero");
    }
  };

  //handle increase function
  const handleIncrease = (item) => {
    // fetch(`http://localhost:3000/carts/${item._id}`, {
     fetch(`https://foodie-backend-umhd.onrender.com/carts/${item._id}`, {
    // fetch(`${API_BASE_URL}/carts/${item._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ quantity: item.quantity + 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
        }
        refetch();
      });
  };

  //Calculate total Amount for all items

  const calculateTotalAmount = cart.reduce((total, item) => {
    return total + calculateTotal(item);
  }, 0);
  const orderTotal = calculateTotalAmount;
console.log(orderTotal)

  //handle delete
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // fetch(`http://localhost:3000/carts/${item._id}`, 
          fetch(`https://foodie-backend-umhd.onrender.com/carts/${item._id}`, 
        // fetch(`${API_BASE_URL}/carts/${item._id}`,
          { method: "DELETE" })
          .then((res) => res.json())
          .then((data) => {
            if (data.n > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
            refetch();
          });
      }
    });
  };

  return (
    <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%   ">
      {/* banner   */}
      <div className="py-32 flex flex-col  justify-center items-center gap-8">
        <div className="  space-y-7 px-4">
          <h2 className="text-4xl leading-snug md:text-5xl  md:leading-snug font-bold">
            Item Added to The
            <span className="text-green  "> Cart</span>
          </h2>
        </div>
      </div>
      {/* if cart is empty */}
      {cart.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-lg mb-6">Cart is empty. Please add products.</p>
          <Link to="/menu">
            {" "}
            <button className="btn bg-green m-5 text-white">
              Back to Menu
            </button>
          </Link>
        </div>
      ) : (
        <>
          {/* table for cart */}
          <div>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead className="bg-green text-white rounded-sm">
                  <tr>
                    <th>#</th>
                    <th>Food </th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Action</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {cart.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img
                                src={item.image}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="font-medium">{item.name}</td>
                      <td>
                        <button
                          className="btn btn-xs"
                          onClick={() => handleDecrease(item)}
                        >
                          -
                        </button>
                        {/* onChange at input is used to remove error messages */}
                        <input
                          type="number"
                          onChange={() => console.log(item.quantity)}
                          readOnly
                          className="w-10 mx-2 text-center overflow-hidden appearance-none"
                          value={item.quantity}
                        />
                        <button
                          className="btn btn-xs"
                          onClick={() => handleIncrease(item)}
                        >
                          +
                        </button>
                      </td>
                      <td>${calculateTotal(item).toFixed(2)}</td>
                      <th>
                        <button
                          className="btn btn-ghost text-red btn-xs"
                          onClick={() => handleDelete(item)}
                        >
                          <FaTrash />
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* customers detail */}
          <div className="my-12 items-start flex space-y-4 flex-col md:flex-row justify-between gap-8">
            <div className=" mt-4 w-full md:w-1/2 space-y-3">
              <h3 className="font-medium">Customer Details</h3>
              <p>
                Name:{" "}
                <span className="font-semibold">
                  {user.displayName || "None"}
                </span>
              </p>
              <p>
                Email: <span className="font-semibold">{user.email}</span>
              </p>
              <p>
                User_id: <span className="font-semibold">{user.uid}</span>
              </p>
            </div>
            <div className=" mt-[-2px] w-full md:w-1/2  space-y-2">
              <h3 className="font-medium">Shopping Details</h3>
              <p>
                Total Item: <span className="font-semibold">{cart.length}</span>
              </p>
              <p>
                Total Price:{" "}
                <span className="font-semibold">${orderTotal.toFixed(2)}</span>
              </p>
              <Link to="/process-checkout">
                {" "}
                <button className="btn bg-green pt-4  mb-10 text-white">
                  Proceed Checkout
                </button>{" "}
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;

{
  /* <div className="">
          
          <p className="font-medium my-8 text-center">
            Cart is empty please add products
          </p>

          <button className="btn bg-green text-center text-white">Back To Menu</button>
         
        </div> */
}
