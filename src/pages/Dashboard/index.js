import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ClipboardList, CheckCircle2, FileWarning, RotateCcw, BadgeCheck, } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../components/StatCard';
export default function Dashboard() {
    const nav = useNavigate();
    const go = (status) => nav(`/exams?status=${status}`);
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("h2", { className: "text-xl font-semibold text-[var(--primary-dark)]", children: "Vis\u00E3o geral" }), _jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: [_jsx(StatCard, { title: "Exames a Laudar", subtitle: "Aguardando laudo", value: 38, icon: _jsx(ClipboardList, { className: "size-6 text-white/70" }), to: "/exames", chips: [
                            { label: '16U', tone: 'red' },
                            { label: '22E', tone: 'green' },
                        ] }), _jsx(StatCard, { title: "Exames Laudados", subtitle: "Finalizados", value: 1211, icon: _jsx(CheckCircle2, { className: "size-6 text-white/70" }), to: "/exames", chips: [
                            { label: '521U', tone: 'blue' },
                            { label: '690E', tone: 'green' },
                        ] }), _jsx(StatCard, { title: "Exames Entregues", subtitle: "Impressos pela institui\u00E7\u00E3o", value: 10876, icon: _jsx(BadgeCheck, { className: "size-6 text-white/70" }), to: "/exames", chips: [
                            { label: '767U', tone: 'red' },
                            { label: '3199E', tone: 'green' },
                        ] }), _jsx(StatCard, { title: "Devolvidos", subtitle: "Anamnese ou pend\u00EAncia", value: 10, icon: _jsx(RotateCcw, { className: "size-6 text-white/70" }), to: "/exames" }), _jsx(StatCard, { title: "Em Processo", value: 0, icon: _jsx(ClipboardList, { className: "size-6 text-white/70" }), to: "/exames" }), _jsx(StatCard, { title: "Em Revis\u00E3o", value: 0, icon: _jsx(FileWarning, { className: "size-6 text-white/70" }), to: "/exames" })] })] }));
}
