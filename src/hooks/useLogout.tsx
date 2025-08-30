"use client";

import { useRouter } from "next/navigation";

export const useLogOut = (): (() => void) => {
  const router = useRouter();

  const logOut = () => {
 
    // localStorage.clear();
    router.push("/sign-in");
  };

  return logOut;
};
