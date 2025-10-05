import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../services/auth';
export default function AuthGuard() {
    const isAuthed = useAuth((s) => s.isAuthenticated());
    const loc = useLocation();
    if (!isAuthed)
        return _jsx(Navigate, { to: "/login", replace: true, state: { from: loc } });
    return _jsx(Outlet, {});
}
