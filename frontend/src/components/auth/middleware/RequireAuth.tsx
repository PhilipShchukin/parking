import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { getAccessToken } from "@/services/auth-token.service";

export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const token = getAccessToken();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
