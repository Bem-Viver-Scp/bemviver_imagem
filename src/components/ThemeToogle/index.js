import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { getInitialTheme, toggleTheme } from '../../theme';
export default function ThemeToggle() {
    const [theme, setTheme] = useState('light');
    useEffect(() => {
        setTheme(getInitialTheme());
    }, []);
    const isDark = theme === 'light';
    return (_jsxs("button", { onClick: () => setTheme(toggleTheme()), className: "inline-flex items-center gap-2 rounded-xl px-3 py-1.5\n                 bg-primary text-primary-foreground\n                 ring-1 ring-[color-mix(in oklab,var(--primary) 30%,transparent)]\n                 hover:brightness-95 transition", title: isDark ? 'Light' : 'Dark', children: [isDark ? _jsx(Sun, { className: "size-4" }) : _jsx(Moon, { className: "size-4" }), _jsx("span", { className: "text-sm", children: isDark ? 'Light' : 'Dark' })] }));
}
