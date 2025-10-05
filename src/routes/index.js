import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './Route';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import ExamsTable from '../pages/Exams';
import PrivateLayout from '../layouts/PrivateLayout'; // ajuste o caminho conforme sua estrutura
const AppRouter = () => {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Login, {}) }), _jsxs(Route, { element: _jsx(PrivateRoute, { element: _jsx(PrivateLayout, {}), allowedRoles: ['master', 'admin', 'coordinator'] }), children: [_jsx(Route, { path: "/dashboard", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "/exames", element: _jsx(ExamsTable, {}) })] }), _jsx(Route, { path: "*", element: _jsx("h1", { children: "P\u00E1gina n\u00E3o encontrada" }) })] }));
};
export default AppRouter;
