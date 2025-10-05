import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet, NavLink } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../services/auth';
import { useAuth as useAuthContext } from '../../hooks/auth';
export default function PrivateLayout() {
    const { userName } = useAuth();
    const { signOut } = useAuthContext();
    return (_jsxs("div", { className: "min-h-screen flex flex-col", children: [_jsx("header", { className: "border-b border-white/10 bg-[var(--primary)] ", children: _jsxs("div", { className: "mx-auto max-w-7xl px-4 py-3 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("img", { src: "/logo.svg", alt: "Bem Viver Logotipo", width: 36 }), _jsx("span", { className: "font-semibold text-white", children: "Bem Viver Imagens \u2022 Painel" }), _jsxs("nav", { className: "ml-6 flex gap-4 text-sm", children: [_jsx(NavLink, { to: "/dashboard", className: ({ isActive }) => `transition hover:opacity-80 ${isActive ? 'text-white' : 'text-white/70'}`, children: "Dashboard" }), _jsx(NavLink, { to: "/exames", className: ({ isActive }) => `transition hover:opacity-80 ${isActive ? 'text-white' : 'text-white/70'}`, children: "Exames" })] })] }), _jsxs("div", { className: "flex items-center gap-3 text-sm", children: [_jsxs("span", { className: "text-white/70", children: ["Ol\u00E1, ", userName] }), _jsxs("button", { onClick: signOut, className: "inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-1.5 hover:bg-white/20 transition text-white", title: "Sair", children: [_jsx(LogOut, { className: "size-4" }), "Sair"] })] })] }) }), _jsx("main", { className: "flex-1 bg-[var(--on-secondary)] ", children: _jsx("div", { className: "mx-auto max-w-7xl p-4 md:p-6 text-[var(--fg)]", children: _jsx(Outlet, {}) }) })] }));
}
