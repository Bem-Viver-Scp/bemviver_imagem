import { create } from 'zustand';

type AuthState = {
  token: string | null;
  userName: string | null;
  login: (user: string, pass: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: () => boolean;
};

export const useAuth = create<AuthState>((set, get) => ({
  token: localStorage.getItem('bv_image_token'),
  userName: localStorage.getItem('bv_image_userName'),
  async login(user, pass) {
    // MOCK: qualquer user/pass → OK (trocar pela API real)
    await new Promise((r) => setTimeout(r, 500));
    const fakeToken = 'mock.jwt.token';
    localStorage.setItem('bv_image_token', fakeToken);
    localStorage.setItem('bv_image_userName', user);
    set({ token: fakeToken, userName: user });
    return true;
  },
  logout() {
    localStorage.removeItem('bv_image_token');
    localStorage.removeItem('bv_image_userName');
    set({ token: null, userName: null });
  },
  isAuthenticated() {
    return !!get().token;
  },
}));
