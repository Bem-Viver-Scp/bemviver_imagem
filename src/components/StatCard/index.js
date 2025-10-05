import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cs';
export default function StatCard({ title, subtitle, value, icon, to, className, chips, }) {
    const Content = (_jsxs("div", { className: cn('rounded-2xl bg-[var(--card)] ring-1 ring-[var(--ring)] p-4 md:p-5 hover:ring-[var(--ring-2)] transition', className), children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "text-xs uppercase tracking-wide text-[var(--muted)]", children: title }), subtitle && (_jsx("div", { className: "mt-1 text-xs text-[var(--muted)]", children: subtitle }))] }), icon] }), _jsx("div", { className: "mt-4 text-3xl font-semibold", children: value }), chips && chips.length > 0 && (_jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: chips.map((c, i) => (_jsx("span", { className: cn('rounded-full px-2.5 py-0.5 text-xs ring-1', c.tone === 'green' &&
                        'bg-emerald-500/15 text-[var(--primary)] ring-emerald-400/30', c.tone === 'red' &&
                        'bg-rose-500/15 text-rose-300 ring-rose-400/30', c.tone === 'blue' &&
                        'bg-sky-500/15 text-[var(--info)] ring-sky-400/30', c.tone === 'yellow' &&
                        'bg-amber-500/15 text-amber-300 ring-amber-400/30'), children: c.label }, i))) }))] }));
    return to ? _jsx(Link, { to: to, children: Content }) : Content;
}
