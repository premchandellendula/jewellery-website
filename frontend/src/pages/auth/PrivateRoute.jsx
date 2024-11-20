import React from 'react'
import { useAuth } from './AuthProvider'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const { isAuthenticated, role, loading } = useAuth();
    console.log("isAuthenticated:", isAuthenticated);
    console.log("loading:", loading);

    if(loading){
        return <div>Loading...</div>;
    }

    if(!isAuthenticated){
        return <Navigate to={'/'} />
    }

    if(role !== 'ADMIN'){
        return <Navigate to={'/'} />
    }

    return <Outlet />;
}

export default PrivateRoute