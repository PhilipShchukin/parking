import { Navigate } from "react-router-dom";
import { getAccessToken } from "@/services/auth-token.service";

export const RequireGuest = ({ children }: { children: React.ReactNode }) => {
  const token = getAccessToken();

  if (token) {
    return <Navigate to="/parking-spots" replace />;
  }

  return <>{children}</>;
};
