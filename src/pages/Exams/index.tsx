import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Printer } from 'lucide-react';
import type { ExamDTO } from '../../dtos';
import api from '../../services/api';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

function formatDate(iso?: string | null) {
  if (!iso) return '-';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '-';
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
  const [rows, setRows] = useState<ExamDTO[]>([]);
  const [search, setSearch] = useState('');
  const [downloading, setDownloading] = useState<Record<string, boolean>>({});
  const q = useQuery();
  const statusFilter = q.get('status') ?? 'all';

  async function getExamFiles() {
    setLoading(true);
    try {
      const { data } = await api.get<ExamDTO[]>('/examFile');
      setRows(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getExamFiles();
  }, []);

  const filtered = useMemo(() => {
    let list = rows;
    if (statusFilter !== 'all') {
      list = list.filter(
        (e) => String(e.status).toLowerCase() === statusFilter.toLowerCase()
      );
    }
    const s = search.trim().toLowerCase();
    if (s) {
      list = list.filter(
        (e) =>
          e.id.toLowerCase().includes(s) ||
          (e.name ?? '').toLowerCase().includes(s)
      );
    }
    return list;
  }, [rows, statusFilter, search]);

  /** Baixa usando um iframe oculto (melhor UX, nenhuma aba em branco) */
  async function handleDownload(id: string) {
    try {
      setDownloading((m) => ({ ...m, [id]: true }));

      // 1) pede a URL ao backend
      const res = await api.get(`/examFile/${encodeURIComponent(id)}`);

      let url: string | undefined = '';
      if (typeof res.data === 'string') {
        url = res.data;
      } else if (res.data && typeof res.data === 'object') {
        url =
          res.data.url ||
          res.data.file_url ||
          res.data.Location ||
          (Object.values(res.data)[0] as string | undefined);
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
        } catch {}
      }, 60_000);
    } catch (err) {
      console.error('Erro ao iniciar download:', err);

      // Fallback: tenta abrir em nova aba caso o iframe falhe por algum motivo
      try {
        const res = await api.get(`/examFile/${encodeURIComponent(id)}`);
        const url =
          (typeof res.data === 'string' && res.data) ||
          res.data?.url ||
          res.data?.file_url ||
          res.data?.Location;

        if (url && /^https?:\/\//i.test(url)) {
          window.open(url, '_blank', 'noopener,noreferrer');
        }
      } catch {
        // se falhar também, apenas logamos
      }
    } finally {
      setDownloading((m) => ({ ...m, [id]: false }));
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3 flex-wrap">
        <div>
          <h2 className="text-xl font-semibold text-[var(--primary-dark)]">
            Exames
          </h2>
        </div>
        <input
          placeholder="Buscar por nome ou ID…"
          className="rounded-xl bg-white/5 px-3 py-2 ring-1 ring-[var(--ring)] 
                     focus:outline-none focus:ring-2 focus:ring-[var(--ring-2)] 
                     w-full sm:w-80"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-2xl ring-1 ring-[var(--ring)] bg-[var(--card)]">
        <table className="min-w-full text-sm">
          <thead className="bg-[var(--thead)]">
            <tr className="text-left text-[var(--muted)]">
              {['ID', 'Nome', 'Data do exame', 'Status', ''].map((h) => (
                <th key={h} className="px-4 py-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-[var(--muted)]"
                >
                  Carregando…
                </td>
              </tr>
            )}

            {!loading &&
              filtered.map((e) => {
                const when = e.data_exame ?? e.created_at;
                const done = String(e.status).toUpperCase() === 'DONE';
                const isDownloading = !!downloading[e.id];

                return (
                  <tr key={e.id} className="odd:bg-white/[0.02]">
                    <td className="px-4 py-3 font-mono">{e.id}</td>
                    <td className="px-4 py-3">{e.name ?? '-'}</td>
                    <td className="px-4 py-3">{formatDate(when)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          done
                            ? 'rounded-full bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30 px-2 py-0.5'
                            : 'rounded-full bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/30 px-2 py-0.5'
                        }
                      >
                        {e.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDownload(e.id)}
                        disabled={!done || isDownloading}
                        className="inline-flex items-center justify-center rounded-xl p-2 ring-1 ring-[var(--ring)] 
                                   hover:ring-[var(--ring-2)] bg-white/10 hover:bg-white/20 transition hover:cursor-pointer
                                   disabled:opacity-50"
                        title={
                          done
                            ? 'Imprimir/baixar'
                            : 'Arquivo ainda não disponível'
                        }
                      >
                        {isDownloading ? (
                          <svg
                            className="size-4 animate-spin"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              opacity=".25"
                            />
                            <path
                              d="M12 2a10 10 0 0 1 10 10"
                              stroke="currentColor"
                            />
                          </svg>
                        ) : (
                          <Printer className="size-4 text-[var(--primary-dark)]/70" />
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}

            {!loading && filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-[var(--muted)]"
                >
                  Nenhum exame encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
