import axios from 'axios'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const axiosPublic = axios.create({
    // baseURL : "http://localhost:3000",
     baseURL : "https://foodie-backend-umhd.onrender.com",
})

const useAxiosPublic = () => {
  return axiosPublic
}

export default useAxiosPublic
