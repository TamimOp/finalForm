import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: undefined,
  isLoading: true,
  setUser: (user: any) =>
    set((state: any) => ({ ...state, user: user, isLoading: false })),
}));
