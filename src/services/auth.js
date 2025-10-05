import { create } from 'zustand';
export const useAuth = create((set, get) => ({
    token: localStorage.getItem('token'),
    userName: localStorage.getItem('userName'),
    async login(user, pass) {
        // MOCK: qualquer user/pass → OK (trocar pela API real)
        await new Promise((r) => setTimeout(r, 500));
        const fakeToken = 'mock.jwt.token';
        localStorage.setItem('token', fakeToken);
        localStorage.setItem('userName', user);
        set({ token: fakeToken, userName: user });
        return true;
    },
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        set({ token: null, userName: null });
    },
    isAuthenticated() {
        return !!get().token;
    },
}));
