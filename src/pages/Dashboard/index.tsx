import {
  ClipboardList,
  CheckCircle2,
  FileWarning,
  RotateCcw,
  BadgeCheck,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../components/StatCard';
import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function Dashboard() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const go = (status: string) => nav(`/exams?status=${status}`);

  const getAppointment = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/examFile`);

      setData(response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAppointment();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Visão geral</h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((item: any) => (
          <StatCard
            key={item.id}
            title="Exames a Laudar"
            subtitle="Aguardando laudo"
            value={item.id}
            icon={<ClipboardList className="size-6 text-white/70" />}
            to="/exams?status=pending"
            chips={[
              { label: '16U', tone: 'red' },
              { label: '22E', tone: 'green' },
            ]}
          />
        ))}
        {/* <StatCard
          title="Exames a Laudar"
          subtitle="Aguardando laudo"
          value={38}
          icon={<ClipboardList className="size-6 text-white/70" />}
          to="/exams?status=pending"
          chips={[
            { label: '16U', tone: 'red' },
            { label: '22E', tone: 'green' },
          ]}
        />
        <StatCard
          title="Exames Laudados"
          subtitle="Finalizados"
          value={1211}
          icon={<CheckCircle2 className="size-6 text-white/70" />}
          to="/exams?status=reported"
          chips={[
            { label: '521U', tone: 'blue' },
            { label: '690E', tone: 'green' },
          ]}
        />
        <StatCard
          title="Exames Entregues"
          subtitle="Impressos pela instituição"
          value={10876}
          icon={<BadgeCheck className="size-6 text-white/70" />}
          to="/exams?status=delivered"
          chips={[
            { label: '767U', tone: 'red' },
            { label: '3199E', tone: 'green' },
          ]}
        />
        <StatCard
          title="Devolvidos"
          subtitle="Anamnese ou pendência"
          value={10}
          icon={<RotateCcw className="size-6 text-white/70" />}
          to="/exams?status=rectification"
        />
        <StatCard
          title="Em Processo"
          value={0}
          icon={<ClipboardList className="size-6 text-white/70" />}
          to="/exams?status=in_process"
        />
        <StatCard
          title="Em Revisão"
          value={0}
          icon={<FileWarning className="size-6 text-white/70" />}
          to="/exams?status=in_review"
        /> */}
      </div>
    </div>
  );
}
