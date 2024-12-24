import React, {  useContext } from 'react'
import { AuthContent } from '../contexts/AuthProvider'
import {Navigate, useLocation, useNavigate} from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'

const PrivateRouter = ({children}) => {
    const {user,loading} = useContext(AuthContent)
    const location = useLocation();

  
   
    if(loading){
        return (
            <LoadingSpinner></LoadingSpinner>
        )
    }

//     if(user) {
//       return children;
//   }
// return <Navigate to="/signup" state={{from: location}} replace></Navigate>
//   };

    if(user){
        return (
           children
        );
    }
 
  return (
   <Navigate to="/signup" state={{from: location}} replace></Navigate>
  )
}


export default PrivateRouter
