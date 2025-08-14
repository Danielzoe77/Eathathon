import React from 'react'
import useMenu from '../../../hooks/useMenu'
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageItems = () => {
    const [menu, ,refetch  ] = useMenu();
   const axiosSecure = useAxiosSecure();
const handleDelete = (item) => {
//    console.log(item) 
Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then(async (result) => {
    if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/menu/${item._id}`);
        if(res){
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
        }
    
    }
  });
}

  return (
    <div className="w-full md:w-[870px] mx-auto px-4">
       <h2 className="text-2xl my-4 font-semibold">
      Manage All <span className="text-green">Menu Items</span>{" "}
      </h2>
    
  {/* table items */}
  <div>
  <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
         #
        </th>
        <th>Image</th>
        <th> Item Name</th>
        <th>Prices</th>
        <th> Edit</th>
        <th> Delete</th>
      </tr>
    </thead>
    <tbody>
  {/* fetch data from the backend */}
  {
    menu.map((item, index) =>(
        <tr key={index}>
        <th>
       {index + 1}
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={item.image}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
          </div>
        </td>
        <td>
          {item.name}
        </td>
        <td>${item.price}</td>
        <td>
        <Link to={`/dashboard/update-menu/${item._id}`}><button className="btn bg-orange-500 text-white btn-ghost btn-xs"><FaEdit /></button> </Link>
        </td>
        <td>
       <button onClick={() => handleDelete(item)} className="btn  bg-orange-500 text-white  btn-ghost btn-xs"><FaTrash /></button> 
        </td>
      </tr>
    ))
  }

      {/* row 1 */}
     

    </tbody>
  
  </table>
</div>
  </div>

    </div>
  )
}

export default ManageItems
