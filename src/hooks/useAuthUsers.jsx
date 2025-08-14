import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { all } from 'axios';

const useAuthUsers = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: allUsers = [],
    isPending: loading,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  // Filter users by role
  const admins = allUsers.filter(user => user.role === 'admin');
 console.log(admins)

  const users = allUsers.filter(user => user.role !== 'admin');

  return {allUsers, users, admins, loading, refetchUsers };
};

export default useAuthUsers;
