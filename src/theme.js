const KEY = 'theme';
export function getSystemTheme() {
    if (typeof window === 'undefined')
        return 'dark';
    return window.matchMedia('(prefers-color-scheme: light)').matches
        ? 'light'
        : 'dark';
}
export function getInitialTheme() {
    const saved = localStorage.getItem(KEY);
    return saved ?? getSystemTheme();
}
export function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(KEY, theme);
}
export function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') ||
        getInitialTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    return next;
}
export function listenSystemTheme(cb) {
    const m = window.matchMedia('(prefers-color-scheme: light)');
    const handler = () => cb(m.matches ? 'light' : 'dark');
    m.addEventListener?.('change', handler);
    return () => m.removeEventListener?.('change', handler);
}
