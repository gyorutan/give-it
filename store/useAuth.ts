import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  auth: boolean;
  login: () => void;
  logout: () => void;

  userId: string;
  setUserId: (userId: string) => void;

  name: string;
  setUsername: (name: string) => void;
}

const useAuth = create(
  persist<AuthStore>(
    (set) => ({
      auth: false,
      login: () => set({ auth: true }),
      logout: () => set({ auth: false }),

      userId: "",
      setUserId: (userId: string) => set(() => ({ userId: userId })),

      name: "",
      setUsername: (name: string) => set(() => ({ name: name })),
    }),
    {
      name: "auth",
    }
  )
);

export default useAuth;
