import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Shop/Menu";
import Signup from "../components/Signup";
import Login from "../components/Login";
import PrivateRouter from "../privateRouter/PrivateRouter";
import UpdateProfile from "../Pages/dashboard/UpdateProfile";
import CartPage from "../components/CartPage";
import DashboardLayout from "../Layout/DashboardLayout";
import Dashboard from "../Pages/dashboard/admin/Dashboard";
import Users from "../Pages/dashboard/admin/Users";
import AddMenu from "../Pages/dashboard/admin/AddMenu";
import ManageItems from "../Pages/dashboard/admin/ManageItems";
import UpdateMenu from "../Pages/dashboard/admin/UpdateMenu";
import Payments from "../components/Payments";
import Order from "../Pages/dashboard/Order";
import ManageBookings from "../Pages/dashboard/admin/ManageBookings";
import CustomerCare from "../Pages/dashboard/admin/CustomerCare";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/cart-page",
          element: <CartPage />,
        },
        {
          path: "/menu",
          element: ( 
           
              <Menu />
          
          ),
        },
        {
          path : "/update-profile",
          element: <UpdateProfile/>
        },
        {
          path : "/process-checkout",
          element: <Payments/>
        },
        {
          path: "/order",
          element:<Order/>
        },
         {
          path: "/customer-care",
          element:<CustomerCare/>
        }
      ],
    },
    {
      path: "/signup",
      element: <Signup />,
    },
     {
      path: "/login",
      element: <Login />,
    },


    //admin route
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children:[
        {
          path: "",
          // element: <PrivateRouter><Dashboard /></PrivateRouter>
          element: <Dashboard />
        },
        {
          path: "users",
          element: <Users />
        },
        {
          path: "add-menu",
          element: <AddMenu />
        },
        {
          path: "manage-items",
          element: <ManageItems />
        },
        {
          path: "manage-bookings",
          element: <ManageBookings />
        },
        {
          path: "update-menu/:id",
          element: <UpdateMenu />,
          loader :  ({params}) => 
            // fetch(`http://localhost:3000/menu/${params.id}`)
            fetch(`${API_BASE_URL}/menu/${params.id}`)
          
        }
      ]
    }
  ]);

  export default router