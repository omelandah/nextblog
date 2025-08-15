import { User } from '@/models/user';
import { decodeToken, getToken, removeToken } from '@/utils/authToken';
import { create } from 'zustand';

interface AuthState {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  const token = getToken();
  let initialUser: User | null = null;

  if (token) {
    const decoded = decodeToken(token);
    if (decoded) {
      initialUser = {
        id: decoded.id,
        username: decoded.username,
        email: decoded.email,
        isAdmin: decoded.isAdmin,
      };
    } else {
      removeToken();
    }
  }

  return {
    currentUser: initialUser,
    setCurrentUser: (user) => set({ currentUser: user }),
    clearUser: () => set({ currentUser: null }),
  };
});
