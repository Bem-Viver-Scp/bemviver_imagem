import { useState, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Stethoscope } from 'lucide-react';
import { useAuth } from '../../services/auth';

export default function Login() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const login = useAuth((s) => s.login);
  const nav = useNavigate();
  const loc = useLocation() as any;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    await login(user, pass);
    setLoading(false);
    const to = loc.state?.from?.pathname ?? '/';
    nav(to, { replace: true });
  }

  return (
    <div className="min-h-screen grid place-items-center px-4">
      <div className="w-full max-w-sm rounded-2xl bg-bg-card/80 ring-1 ring-white/10 p-6">
        <div className="flex items-center gap-2 mb-6">
          {/* <Stethoscope className="size-6" /> */}
          <img src="/logo.svg" alt="Bem Viver Logotipo" width={48} />

          <h1 className="text-lg font-semibold">Bem Viver • Acesso</h1>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-white/70">Usuário</label>
            <input
              className="mt-1 w-full rounded-xl bg-white/5 px-3 py-2 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div>
            <label className="text-sm text-white/70">Senha</label>
            <input
              type="password"
              className="mt-1 w-full rounded-xl bg-white/5 px-3 py-2 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
            />
          </div>
          <button
            disabled={loading}
            className="w-full rounded-xl bg-white/10 px-3 py-2 hover:bg-white/20 transition disabled:opacity-60 hover:cursor-pointer"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
