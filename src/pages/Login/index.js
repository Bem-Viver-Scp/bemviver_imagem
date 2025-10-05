import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { toast } from 'react-toastify';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useAuth } from '../../hooks/auth';
export default function Login() {
    const { signIn } = useAuth();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [values, setValues] = useState({ email: '', password: '' });
    const nav = useNavigate();
    const loc = useLocation();
    async function handleSubmit() {
        setErrors({});
        setLoading(true);
        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                    .email('Email inválido')
                    .required('Email obrigatório'),
                password: Yup.string()
                    .min(6, 'Mínimo de 6 caracteres')
                    .required('Senha obrigatória'),
            });
            await schema.validate(values, { abortEarly: false });
            await signIn(values);
            toast.success('Login realizado com sucesso!');
            nav('/dashboard');
        }
        catch (err) {
            if (err.name === 'ValidationError') {
                setErrors(getValidationErrors(err));
            }
            else {
                toast.error(err?.response?.data?.message ?? 'Erro ao fazer login');
            }
        }
        finally {
            setLoading(false);
        }
    }
    return (_jsx("div", { className: "min-h-screen grid place-items-center px-4 bg-[var(--primary)]", children: _jsxs("div", { className: "w-full max-w-sm rounded-2xl bg-[var(--card)] ring-1 ring-[var(--ring)] p-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-6", children: [_jsx("img", { src: "/logo.svg", alt: "Bem Viver Logotipo", width: 40, height: 40 }), _jsx("h1", { className: "text-lg font-semibold", children: "Bem Viver \u2022 Acesso" })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("label", { htmlFor: "email", className: "text-sm text-[var(--muted)]", children: "Email" }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2", children: _jsx(Mail, { className: "size-4 text-[var(--muted)]" }) }), _jsx("input", { id: "email", type: "email", className: "w-full rounded-xl bg-white/5 px-9 py-2 ring-1 ring-[var(--ring)]\n                         focus:outline-none focus:ring-2 focus:ring-[var(--ring-2)]\n                         placeholder:text-[var(--muted)]", placeholder: "seu@email.com", value: values.email, onChange: (e) => setValues((v) => ({ ...v, email: e.target.value })), autoFocus: true })] }), errors.email && (_jsx("p", { className: "text-xs text-rose-400", children: errors.email })), _jsx("label", { htmlFor: "password", className: "text-sm text-[var(--muted)]", children: "Senha" }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2", children: _jsx(Lock, { className: "size-4 text-[var(--muted)]" }) }), _jsx("input", { id: "password", type: showPassword ? 'text' : 'password', className: "w-full rounded-xl bg-white/5 px-9 py-2 ring-1 ring-[var(--ring)]\n                         focus:outline-none focus:ring-2 focus:ring-[var(--ring-2)]\n                         placeholder:text-[var(--muted)]", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", value: values.password, onChange: (e) => setValues((v) => ({ ...v, password: e.target.value })) }), _jsx("button", { type: "button", onClick: () => setShowPassword((s) => !s), className: "absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1\n                         hover:bg-white/10 transition", "aria-label": showPassword ? 'Ocultar senha' : 'Mostrar senha', title: showPassword ? 'Ocultar senha' : 'Mostrar senha', children: showPassword ? (_jsx(EyeOff, { className: "size-4 text-[var(--muted)]" })) : (_jsx(Eye, { className: "size-4 text-[var(--muted)]" })) })] }), errors.password && (_jsx("p", { className: "text-xs text-rose-400", children: errors.password })), _jsx("button", { onClick: handleSubmit, disabled: loading, className: "w-full rounded-xl bg-[var(--primary)] text-white px-3 py-2 hover:bg-[var(--primary)]/90 transition\n                       disabled:opacity-60 hover:cursor-pointer mt-4 ", children: loading ? 'Entrando...' : 'Entrar' })] })] }) }));
}
