import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth';
export const PrivateRoute = ({ element, allowedRoles }) => {
    const { isAuthenticated, user } = useAuth();
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: "/" });
    }
    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        return _jsx(Navigate, { to: "/acesso-negado" });
    }
    return element;
};
