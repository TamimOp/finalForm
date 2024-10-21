"use client";

import { useUserStore } from "@/store/user-store";
import axios, { AxiosError } from "axios";
import { useEffect } from "react";

export default function Verify() {
  const setUser = useUserStore((state: any) => state.setUser);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get("/api/auth/verify");

        if (response.data.valid) {
          setUser(response.data.decoded);
        } else {
          setUser(undefined);
        }
      } catch (error) {
        const axiosError = error as AxiosError;

        console.error("Token verification failed:", axiosError.message);
      }
    };

    verifyToken();
  }, [setUser]);

  return null;
}
