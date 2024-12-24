import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Shop/Menu";
import Signup from "../components/Signup";
import PrivateRouter from "../privateRouter/PrivateRouter";

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
          path: "/menu",
          element: (
          
            <PrivateRouter>
              <Menu />
            </PrivateRouter>
         
          ),
        },
      ],
    },
    {
      path: "/signup",
      element: <Signup />,
    }
  ]);

  export default router