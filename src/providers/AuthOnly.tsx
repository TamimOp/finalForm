"use client";
import { useUserStore } from "@/store/user-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function AuthOnly({ children, alternateRoute = undefined }: any) {
  const user = useUserStore((state: any) => state.user);
  const isLoading = useUserStore((state: any) => state.isLoading); // Assuming you have a loading state in your store
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    } else {
      if (alternateRoute) {
        router.push(alternateRoute);
      }
    }
  }, [user, isLoading, router, alternateRoute]);

  if (isLoading) return <div>Loading...</div>;

  return children;
}

export default AuthOnly;
