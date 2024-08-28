import React from 'react'
import { useAuth } from './AuthProvider'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const { isAuthenticated, role } = useAuth();

    if(!isAuthenticated){
        return <Navigate to={'/'} />
    }

    if(role != 'ADMIN'){
        return <Navigate to={'/'} />
    }

    return <Outlet />;
}

export default PrivateRoute