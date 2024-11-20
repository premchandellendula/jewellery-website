import { useAuth } from "./AuthProvider";
import { Navigate, Outlet } from 'react-router-dom';

const UserRoute = () => {
    const { isAuthenticated, role, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated || role !== 'USER') {
        return <Navigate to={'/'} replace />;
    }

    return <Outlet />;
};

export default UserRoute;
