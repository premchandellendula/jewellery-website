import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('auth');
        const userRole = localStorage.getItem('role');
        if(auth === 'true' && userRole){
            setIsAuthenticated(true);
            setRole(userRole);
        }else {
            setIsAuthenticated(false);
            setRole('');
        }
        setLoading(false);
    }, []);

    const login = (userRole) => {
        localStorage.setItem('auth', 'true');
        localStorage.setItem('role', userRole);
        setIsAuthenticated(true);
        setRole(userRole)
        console.log("Login called. Role:", userRole);
    }

    const logout = () => {
        localStorage.removeItem('auth');
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setRole('')
        navigate('/')
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, role, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);