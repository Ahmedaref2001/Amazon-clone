import React, { useEffect, useState } from 'react';
import { useContextData } from '../store/useContextData';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { auth } from '../firebase';

const RequireAuth = () => {
  const { user } = useContextData().state;
  const { dispatch } = useContextData();
  const location = useLocation();
  const [loading,setLoading]=useState(true)
  // Handle user authentication change
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      dispatch({
        type: "SET_USER",
        payload: user || null,
      });
      setLoading(false)
    });
      
 }, [dispatch])

 if(!loading){
    return (
      user ? <Outlet /> : <Navigate to="/login" state={{ from: location.pathname }} />
    );
 }
  
};


export default RequireAuth;
