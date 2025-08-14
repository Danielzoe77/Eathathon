import React, { useContext } from "react";
// import useCarts from "../../hooks/useCarts";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Order = () => {
      const {user} = useAuth();
      console.log(user)
         const token = localStorage.getItem('Access-token')
         const {refetch, data:orders = []} = useQuery({ 
             queryKey: ['orders', user?.email],
             queryFn: async () => {
                 //at the backend we use the get method to fetch the data which is the payment details via the individual email that was logged in
                 //so we did the security by sending headers which has the token 
                //  const res = await fetch(`http://localhost:3000/payments?email=${user?.email }`,{
                const res = await fetch(`${API_BASE_URL}/payments?email=${user?.email }`,{
                     headers:{
                         authorization:`Bearer ${token}`
                     }
                 })
                 return res.json();
             }, 
         })

         console.log(orders)

         // how to format your date in order to avoid this format 2025-04-30T07:52:05.907Z
         const formatDate = (createdAt) =>{
          const createdAtDate = new Date (createdAt)
          return createdAtDate.toLocaleDateString()
         }



  return (
   <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%   ">
        {/* banner   */}
        <div className="py-32 flex flex-col  justify-center items-center gap-8">
          <div className="  space-y-7 px-4">
            <h2 className="text-4xl leading-snug md:text-5xl  md:leading-snug font-bold">
             Track all your 
              <span className="text-green  "> Orders</span>
            </h2>
          </div>
        </div>
        {/* if cart is empty */}
        {orders.length === 0 ? (
          <div className="text-center mt-20">
            <p className="text-lg mb-6">No previous order yet. Please order</p>
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
                      <th>Order Date </th>
                      <th>TransitionId</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Action</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    {orders.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                            
                           { formatDate(item.createdAt)}
                          
                            </div>
                          </div>
                        </td>
                        <td className="font-medium">{item.tansactionId}</td>
                        <td>
                          ${item.TotalPrice
                          }
                        </td>
                         <td>{item.status}</td>
                        <td>
                          <Link to='/contact'
                           className="btn bg-green text-white">
                          Contact
                          </Link>
                        </td>
                      
                       
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
  
          </>
        )}
      </div>
  )
}

export default Order



            // {/* customers detail */}
            // <div className="my-12 items-start flex space-y-4 flex-col md:flex-row justify-between gap-8">
            //   <div className=" mt-4 w-full md:w-1/2 space-y-3">
            //     <h3 className="font-medium">Customer Details</h3>
            //     <p>
            //       Name:{" "}
            //       <span className="font-semibold">
            //         {user.displayName || "None"}
            //       </span>
            //     </p>
            //     <p>
            //       Email: <span className="font-semibold">{user.email}</span>
            //     </p>
            //     <p>
            //       User_id: <span className="font-semibold">{user.uid}</span>
            //     </p>
            //   </div>
            //   <div className=" mt-[-2px] w-full md:w-1/2  space-y-2">
            //     <h3 className="font-medium">Shopping Details</h3>
            //     <p>
            //       Total Item: <span className="font-semibold">{orders.length}</span>
            //     </p>
            //     <p>
            //       Total Price:{" "}
            //       {/* <span className="font-semibold">${orderTotal.toFixed(2)}</span> */}
            //     </p>
            //     <Link to="/process-checkout">
            //       {" "}
            //       <button className="btn bg-green pt-4  mb-10 text-white">
            //         Proceed Checkout
            //       </button>{" "}
            //     </Link>
            //   </div>
            // </div>