import { useAuth } from "./AuthProvider";
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    const { isAuthenticated, role, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated || role !== 'ADMIN') {
        return <Navigate to={'/'} replace />;
    }

    return <Outlet />;
};

export default AdminRoute;
