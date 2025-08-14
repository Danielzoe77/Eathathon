import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import useAuth from './useAuth';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosSecure = axios.create({
    // baseURL: 'http://localhost:3000',
     baseURL: 'https://foodie-backend-umhd.onrender.com',
    // baseURL: API_BASE_URL
})


const useAxiosSecure = () => {
    const navigate = useNavigate();
    const{logOut} = useAuth();

    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('Access-token');
        //console.log("Sending token:", token);

        config.headers.authorization = `Bearer ${token}`
        return config;
    },function(error){
        return Promise.reject(error);
    });


    //add a response interceptor
    axiosSecure.interceptors.response.use(function(response){
        return response;

    },async (error)=>{
        const status= error.response.status;
        if(status === 401|| status === 403 ){
           await logOut() 
           navigate("/")
        }
            return Promise.reject(error);
    })
  return axiosSecure
}

export default useAxiosSecure
