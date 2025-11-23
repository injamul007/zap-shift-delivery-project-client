import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const MyParcels = () => {
  const {user} = useAuth();
  const axiosSecure  = useAxiosSecure();

  const {data: parcels=[]} = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`)
      return res.data.result
    }
  })

  return (
    <div>
      <h1 className='text-3xl text-center'>All of My Parcels : {parcels.length || "No Parcel Found"}</h1>
    </div>
  );
};

export default MyParcels;