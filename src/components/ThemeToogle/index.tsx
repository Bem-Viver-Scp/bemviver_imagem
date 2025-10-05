import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { getInitialTheme, toggleTheme } from '../../theme';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    setTheme(getInitialTheme());
  }, []);

  return (
    <button
      onClick={() => setTheme(toggleTheme())}
      className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 ring-1 transition
                 bg-[var(--card)] ring-[var(--ring)] hover:ring-[var(--ring-2)]"
      title={theme === 'dark' ? 'Light' : 'Dark'}
    >
      {theme === 'dark' ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
      <span className="text-sm text-[var(--muted)]">
        {theme === 'dark' ? 'Light' : 'Dark'}
      </span>
    </button>
  );
}
