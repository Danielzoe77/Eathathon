import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  // const isAdmin = false;

  const handleMakeAdmin =(user) =>{
    axiosSecure.patch(`/users/admin/${user._id}`).then((res)=>{
      alert(`${user.name} is now an admin`)
      refetch()
    })
    
  }


  //handle delete user
  const handleDeleteUser =user =>{
    axiosSecure.delete(`/users/${user._id}`).then((res) =>{
      alert(`${user.name} is remove from an database`)
      refetch()
    })
    
  }
 //console.log(users)


//  pagination
 const usersPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(users.length / usersPerPage);

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

  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = users.slice(startIndex, startIndex + usersPerPage);

  return (
    <div>
      <div className="items-center justify-between mx-4 my-4 flex">
        <h5>All Users</h5>
        <h5>Total Users {users.length}</h5>
      </div>

      {/* table from daisy ui*/}
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra md:w-[870px]">
            {/* head */}
            <thead className="bg-green text-white rounded-lg">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            
            {
              currentUsers.map((user, index) => (
                <tr key={user._id}>
                  <th>{startIndex + index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role === "admin" ? "Admin" : (
                    <button onClick={() => handleMakeAdmin(user)} className="btn  btn-xs btn-circle bg-indigo-500 text-white"><FaUsers /></button> 
                  )}</td>
                  <td>
                    <button onClick={() => handleDeleteUser(user)} className="btn  btn-xs bg-orange-500 text-white"><FaTrashAlt /></button>
                  </td>
                </tr>
              ))
            }
           
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

export default Users;
