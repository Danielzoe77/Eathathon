// import React from 'react'
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';

const useAdmin = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    refetch,
    data: isAdmin,
    isPending: isAdminLoading,
  } = useQuery({
    queryKey: [user?.email, 'isAdmin'],
    enabled: !loading && !!user?.email, // ✅ only run when user is ready
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user.email}`);
      return res.data?.admin;
    },
  });

  return [isAdmin, isAdminLoading, refetch];
};

export default useAdmin;
