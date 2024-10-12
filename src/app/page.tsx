"use client";

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get("/api/auth/verify");

        if (response.data.valid) {
          router.push("/dashboard");
        } else {
          router.push("/login");
        }
      } catch (error) {
        // Assert that error is an AxiosError
        const axiosError = error as AxiosError;

        // Log the error message or handle it accordingly
        console.error("Token verification failed:", axiosError.message);
      }
    };

    verifyToken();
  }, [router]);

  return null; // Return null for the component since no JSX is being rendered
}
