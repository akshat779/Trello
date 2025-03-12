import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CircularProgress } from '@mui/material';


const PrivateRoute = ({ element }) => {
  const { user,loading } = useAuth();

  if (loading){
    return <div className='flex justify-center items-center h-screen'>
        <CircularProgress size={80} />
    </div>
  }

  return user ? element : <Navigate to="/" />;
};

export default PrivateRoute;