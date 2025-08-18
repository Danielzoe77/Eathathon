import React from 'react'
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useOrders = () => {
    const { user } = useAuth();
  console.log(user);
  const axiosSecure = useAxiosSecure();
  const token = localStorage.getItem("Access-token");
  const {data: allPayments = [], isLoading, refetchOrders} = useQuery({
    queryKey: ["allPayments", user],
    queryFn: async () => {
      //at the backend we use the get method to fetch the data which is the payment details via the individual email that was logged in
      //so we did the security by sending headers which has the token
      // const res = await fetch(`http://localhost:3000/payments/admin`, {
        const res = await fetch(`https://foodie-backend-umhd.onrender.com/payments/admin`, {
      // const res = await fetch(`${API_BASE_URL}/payments/admin`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return res.json();
    },
  });

   // Filter transactions by status
   const confirmed = allPayments.filter(
    (order) => order.status === "confirmed"
  );
  const pending = allPayments.filter(
    (order) => order.status === "Order Pending"
  );

  const totalPrice = allPayments.reduce(
    (acc, order) => acc + (order.TotalPrice || 0),
    0
  );

  return {
    allPayments,
    confirmed,
    pending,
    totalPrice,
    isLoading,
    refetchOrders,
  };

}

export default useOrders
