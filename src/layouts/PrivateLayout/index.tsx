import { Outlet, NavLink } from 'react-router-dom';
import { LogOut, Stethoscope } from 'lucide-react';
import { useAuth } from '../../services/auth';
import ThemeToggle from '../../components/ThemeToogle';

export default function PrivateLayout() {
  const { userName, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-white/10 bg-bg-soft">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* <Stethoscope className="size-6" /> */}
            <img src="/logo.svg" alt="Bem Viver Logotipo" width={36} />

            <span className="font-semibold">Bem Viver Imagens • Painel</span>
            <nav className="ml-6 flex gap-4 text-sm">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `transition hover:opacity-80 ${
                    isActive ? 'text-white' : 'text-white/70'
                  }`
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/exames"
                className={({ isActive }) =>
                  `transition hover:opacity-80 ${
                    isActive ? 'text-white' : 'text-white/70'
                  }`
                }
              >
                Exames
              </NavLink>
            </nav>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-white/70">Olá, {userName}</span>
            <ThemeToggle />
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-1.5 hover:bg-white/20 transition"
              title="Sair"
            >
              <LogOut className="size-4" />
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-7xl p-4 md:p-6 text-[var(--fg)]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
