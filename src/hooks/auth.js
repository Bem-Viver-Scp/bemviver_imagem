import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState, useContext, useCallback, } from 'react';
import { useNavigate } from 'react-router-dom';
import { key } from '../config/key';
import api from '../services/api';
const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [data, setData] = useState(() => {
        const refresh_token = localStorage.getItem(key.refreshToken);
        const token = localStorage.getItem(key.token);
        const user = localStorage.getItem(key.user);
        if (token && user && refresh_token) {
            api.defaults.headers.authorization = `Bearer ${token}`;
            return { token, user: JSON.parse(user), refresh_token };
        }
        return {};
    });
    const signIn = useCallback(async ({ email, password }) => {
        const response = await api.post('sessions', { email, password });
        const { token, user, refresh_token } = response.data;
        localStorage.setItem(key.refreshToken, refresh_token);
        localStorage.setItem(key.token, token);
        localStorage.setItem(key.user, JSON.stringify(user));
        api.defaults.headers.authorization = `Bearer ${token}`;
        setData({ token, user, refresh_token });
        navigate('/dashboard');
    }, [navigate]);
    const signOut = useCallback(() => {
        localStorage.removeItem(key.refreshToken);
        localStorage.removeItem(key.token);
        localStorage.removeItem(key.user);
        setData({});
        navigate('/');
    }, [navigate]);
    const updateUser = (user) => {
        localStorage.setItem(key.user, JSON.stringify(user));
        setData((prev) => ({ ...prev, user }));
    };
    return (_jsx(AuthContext.Provider, { value: {
            signIn,
            signOut,
            isAuthenticated: !!data.user,
            user: data.user,
            updateUser,
        }, children: children }));
};
export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}
