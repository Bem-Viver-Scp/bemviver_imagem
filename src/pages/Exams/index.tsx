import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { ExamDTO } from '../../dtos';
import { examsMock } from '../../services/mock';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function ExamsTable() {
  const q = useQuery();
  const statusFilter = q.get('status') ?? 'all';
  const [search, setSearch] = useState('');

  const data = useMemo(() => {
    let list: ExamDTO[] = examsMock;
    if (statusFilter !== 'all')
      list = list.filter((e) => e.status === statusFilter);
    if (search.trim()) {
      const s = search.toLowerCase();
      list = list.filter(
        (e) =>
          e.patientName.toLowerCase().includes(s) ||
          e.examName.toLowerCase().includes(s) ||
          String(e.id).includes(s)
      );
    }
    return list;
  }, [statusFilter, search]);

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3 flex-wrap">
        <div>
          <h2 className="text-xl font-semibold">Exames</h2>
          <p className="text-white/60 text-sm">
            Filtro atual: <span className="font-mono">{statusFilter}</span>
          </p>
        </div>
        <input
          placeholder="Buscar por paciente, exame ou ID…"
          className="rounded-xl bg-white/5 px-3 py-2 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 w-full sm:w-80"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-2xl ring-1 ring-white/10">
        <table className="min-w-full text-sm">
          <thead className="bg-white/5">
            <tr className="text-left text-white/70">
              {[
                'ID',
                'Data',
                'Mod',
                'Exame',
                'Paciente',
                'ID Paciente',
                'Tipo',
                'Achado Crítico',
                'Imgs',
                'Status',
              ].map((h) => (
                <th key={h} className="px-4 py-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((e) => (
              <tr key={e.id} className="odd:bg-white/[0.02]">
                <td className="px-4 py-3 font-mono">{e.id}</td>
                <td className="px-4 py-3">
                  {new Date(e.examDate).toLocaleString()}
                </td>
                <td className="px-4 py-3">{e.modality}</td>
                <td className="px-4 py-3">{e.examName}</td>
                <td className="px-4 py-3">{e.patientName}</td>
                <td className="px-4 py-3">{e.patientId}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      e.type === 'Urgente'
                        ? 'rounded-full bg-rose-500/15 text-rose-300 ring-1 ring-rose-400/30 px-2 py-0.5'
                        : 'rounded-full bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30 px-2 py-0.5'
                    }
                  >
                    {e.type}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {e.criticalFindings ? 'Sim' : 'Não'}
                </td>
                <td className="px-4 py-3">{e.images}</td>
                <td className="px-4 py-3">{e.status}</td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td
                  colSpan={10}
                  className="px-4 py-10 text-center text-white/60"
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
