import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import Loading from '../components/Loading/Loading';

const PrivateRoute = ({children}) => {
  const {user, loading} = useAuth();
  const location = useLocation()

  if(loading) return <Loading></Loading>

  if(user && user.email) {
    return children;
  }

  return  <Navigate to={'/auth/login'} state={location.pathname} ></Navigate>
};

export default PrivateRoute;