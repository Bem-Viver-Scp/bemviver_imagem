import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Printer } from 'lucide-react';
import api from '../../services/api';
function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}
function formatDate(iso) {
    if (!iso)
        return '-';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime()))
        return '-';
    return d.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}
export default function ExamsTable() {
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState([]);
    const [search, setSearch] = useState('');
    const [downloading, setDownloading] = useState({});
    const q = useQuery();
    const statusFilter = q.get('status') ?? 'all';
    async function getExamFiles() {
        setLoading(true);
        try {
            const { data } = await api.get('/examFile');
            setRows(Array.isArray(data) ? data : []);
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getExamFiles();
    }, []);
    const filtered = useMemo(() => {
        let list = rows;
        if (statusFilter !== 'all') {
            list = list.filter((e) => String(e.status).toLowerCase() === statusFilter.toLowerCase());
        }
        const s = search.trim().toLowerCase();
        if (s) {
            list = list.filter((e) => e.id.toLowerCase().includes(s) ||
                (e.name ?? '').toLowerCase().includes(s));
        }
        return list;
    }, [rows, statusFilter, search]);
    /** Baixa usando um iframe oculto (melhor UX, nenhuma aba em branco) */
    async function handleDownload(id) {
        try {
            setDownloading((m) => ({ ...m, [id]: true }));
            // 1) pede a URL ao backend
            const res = await api.get(`/examFile/${encodeURIComponent(id)}`);
            let url = '';
            if (typeof res.data === 'string') {
                url = res.data;
            }
            else if (res.data && typeof res.data === 'object') {
                url =
                    res.data.url ||
                        res.data.file_url ||
                        res.data.Location ||
                        Object.values(res.data)[0];
            }
            if (!url || typeof url !== 'string' || !/^https?:\/\//i.test(url)) {
                console.error('URL inválida recebida do back:', url);
                return;
            }
            // 2) cria um iframe oculto que aponta para a URL do arquivo
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = url;
            document.body.appendChild(iframe);
            // 3) remove o iframe depois de um tempo (evita acumular nós no DOM)
            // (tempo suficiente pro navegador iniciar o download)
            setTimeout(() => {
                try {
                    document.body.removeChild(iframe);
                }
                catch { }
            }, 60000);
        }
        catch (err) {
            console.error('Erro ao iniciar download:', err);
            // Fallback: tenta abrir em nova aba caso o iframe falhe por algum motivo
            try {
                const res = await api.get(`/examFile/${encodeURIComponent(id)}`);
                const url = (typeof res.data === 'string' && res.data) ||
                    res.data?.url ||
                    res.data?.file_url ||
                    res.data?.Location;
                if (url && /^https?:\/\//i.test(url)) {
                    window.open(url, '_blank', 'noopener,noreferrer');
                }
            }
            catch {
                // se falhar também, apenas logamos
            }
        }
        finally {
            setDownloading((m) => ({ ...m, [id]: false }));
        }
    }
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-end justify-between gap-3 flex-wrap", children: [_jsx("div", { children: _jsx("h2", { className: "text-xl font-semibold text-[var(--primary-dark)]", children: "Exames" }) }), _jsx("input", { placeholder: "Buscar por nome ou ID\u2026", className: "rounded-xl bg-white/5 px-3 py-2 ring-1 ring-[var(--ring)] \n                     focus:outline-none focus:ring-2 focus:ring-[var(--ring-2)] \n                     w-full sm:w-80", value: search, onChange: (e) => setSearch(e.target.value) })] }), _jsx("div", { className: "overflow-x-auto rounded-2xl ring-1 ring-[var(--ring)] bg-[var(--card)]", children: _jsxs("table", { className: "min-w-full text-sm", children: [_jsx("thead", { className: "bg-[var(--thead)]", children: _jsx("tr", { className: "text-left text-[var(--muted)]", children: ['ID', 'Nome', 'Data do exame', 'Status', ''].map((h) => (_jsx("th", { className: "px-4 py-3 font-medium", children: h }, h))) }) }), _jsxs("tbody", { children: [loading && (_jsx("tr", { children: _jsx("td", { colSpan: 5, className: "px-4 py-6 text-center text-[var(--muted)]", children: "Carregando\u2026" }) })), !loading &&
                                    filtered.map((e) => {
                                        const when = e.data_exame ?? e.created_at;
                                        const done = String(e.status).toUpperCase() === 'DONE';
                                        const isDownloading = !!downloading[e.id];
                                        return (_jsxs("tr", { className: "odd:bg-white/[0.02]", children: [_jsx("td", { className: "px-4 py-3 font-mono", children: e.id }), _jsx("td", { className: "px-4 py-3", children: e.name ?? '-' }), _jsx("td", { className: "px-4 py-3", children: formatDate(when) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: done
                                                            ? 'rounded-full bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30 px-2 py-0.5'
                                                            : 'rounded-full bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/30 px-2 py-0.5', children: e.status }) }), _jsx("td", { className: "px-4 py-3 text-right", children: _jsx("button", { onClick: () => handleDownload(e.id), disabled: !done || isDownloading, className: "inline-flex items-center justify-center rounded-xl p-2 ring-1 ring-[var(--ring)] \n                                   hover:ring-[var(--ring-2)] bg-white/10 hover:bg-white/20 transition hover:cursor-pointer\n                                   disabled:opacity-50", title: done
                                                            ? 'Imprimir/baixar'
                                                            : 'Arquivo ainda não disponível', children: isDownloading ? (_jsxs("svg", { className: "size-4 animate-spin", viewBox: "0 0 24 24", fill: "none", children: [_jsx("circle", { cx: "12", cy: "12", r: "10", stroke: "currentColor", opacity: ".25" }), _jsx("path", { d: "M12 2a10 10 0 0 1 10 10", stroke: "currentColor" })] })) : (_jsx(Printer, { className: "size-4 text-[var(--primary-dark)]/70" })) }) })] }, e.id));
                                    }), !loading && filtered.length === 0 && (_jsx("tr", { children: _jsx("td", { colSpan: 5, className: "px-4 py-10 text-center text-[var(--muted)]", children: "Nenhum exame encontrado." }) }))] })] }) })] }));
}
