import { fetchCurrentUser } from "@/actions/users";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create()(
  persist(
    (set, get) => ({
      user: {},
      loading: false,
      fetchUser: async () => {
        set({ loading: true });
        const currentUser = await fetchCurrentUser();
        set({ loading: false, user: currentUser });
      },
    }),
    {
      name: "User store",
    }
  )
);
