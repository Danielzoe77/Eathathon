import React from "react";
import useMenu from "../../../hooks/useMenu";
import { FaEdit, FaTrash, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ManageBookings = () => {
  const { user } = useAuth();
  console.log(user);
  const axiosSecure = useAxiosSecure();
  const token = localStorage.getItem("Access-token");
  const { refetch, data: allPayments = [] } = useQuery({
    queryKey: ["allPayments", user],
    queryFn: async () => {
      //at the backend we use the get method to fetch the data which is the payment details via the individual email that was logged in
      //so we did the security by sending headers which has the token
      // const res = await fetch(`http://localhost:3000/payments/admin`, {
      const res = await fetch(`${API_BASE_URL}/payments/admin`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return res.json();
    },
  });

  //    console.log(allPayments)

  const handleConfirmOrder = async (item) => {
    try {
      const res = await axiosSecure.patch(`/payments/admin/${item._id}`, {
        status: "confirmed",
      });
      if (res.data) {
        Swal.fire({
          title: "Success!",
          text: "Order has been confirmed.",
          icon: "success",
        });
        refetch(); // Re-fetch the data to update the table
      }
    } catch (error) {
      console.error("Failed to update order status", error);
    }
  };

  const handleDelete = (item) => {
    //    console.log(item)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/payments/${item._id}`);
        if (res) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allPayments.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = allPayments.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full md:w-[870px] mx-auto px-4">
      <h2 className="text-2xl my-4 font-semibold">
        Manage All <span className="text-green">Bookings</span>{" "}
      </h2>

      {/* table items */}
      <div>
        <div className="overflow-hidden">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>user</th>
                <th>Transition Id</th>
                <th>Prices</th>
                <th> status</th>
                <th> confirm order</th>
                <th> Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* fetch data from the backend */}
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <th>{startIndex + index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <h3>{item.email}</h3>
                      </div>
                    </div>
                  </td>
                  <td>{item.tansactionId}</td>
                  <td>${item.TotalPrice}</td>
                  <td>
                    <h4>{item.status}</h4>
                  </td>

                  <td>
                    {item.status === "confirmed" ? (
                      <span className="text-green-500 font-normal">Done</span>
                    ) : (
                      <button
                        onClick={() => handleConfirmOrder(item)}
                        className="btn btn-xs btn-circle text-center bg-indigo-500 text-white"
                      >
                        <FaUsers />
                      </button>
                    )}
                  </td>

                  <td>
                    <button
                      onClick={() => handleDelete(item)}
                      className="btn  bg-orange-500 text-white  btn-ghost btn-xs"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}

              {/* row 1 */}
            </tbody>
          </table>

          {/* Pagination controls */}
          <div className="flex justify-center mt-6">
            <div className="flex gap-4">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="btn btn-sm btn-outline"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="btn btn-sm btn-outline"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;
