import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppProvider from './hooks';
import AppRouter from './routes';
export default function App() {
    return (_jsx(BrowserRouter, { children: _jsxs(AppProvider, { children: [_jsx(ToastContainer, { position: "top-right", autoClose: 3000, theme: "light" }), _jsx(AppRouter, {})] }) }));
}
