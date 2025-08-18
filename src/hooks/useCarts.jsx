//using tankstar plugin to create the cart

import { useContext } from "react"
import { AuthContent } from "../contexts/AuthProvider"
import { useQuery } from "@tanstack/react-query"
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const useCarts = () => {
    const {user} = useContext(AuthContent)
    const token = localStorage.getItem('Access-token')
    const {refetch, data:cart = []} = useQuery({ 
        queryKey: ['carts', user?.email],
        queryFn: async () => {
            //securing this route for unauthorized user by sending headers which has the token
            // const res = await fetch(`http://localhost:3000/carts?email=${user?.email }`,{
             const res = await fetch(`https://foodie-backend-umhd.onrender.com/carts?email=${user?.email }`,{
            // const res = await fetch(`${API_BASE_URL}/carts?email=${user?.email }`,{      
                headers:{
                    authorization:`Bearer ${token}`
                }
            })
            return res.json();
        }, 
    })

  return [cart, refetch ]
    
  
}

export default useCarts
