import { createBrowserRouter } from "react-router-dom";
import { AuthFormSwitcher } from "@/components/auth/auth-form-switcher";
import ParkingSpots from "@/pages/parking-spots";
import { RequireAuth } from "@/components/auth/middleware/RequireAuth";
import MyReservations from "./pages/my-reservation";
import { RequireGuest } from "./components/auth/middleware/RequireGuest";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireGuest>
        <AuthFormSwitcher />
      </RequireGuest>
    ),
  },
  {
    path: "/parking-spots",
    element: (
      <RequireAuth>
        <ParkingSpots />
      </RequireAuth>
    ),
  },
  {
    path: "/my-reservations",
    element: (
      <RequireAuth>
        <MyReservations />
      </RequireAuth>
    ),
  },
  {
    path: "*",
    element: (
      <RequireGuest>
        <AuthFormSwitcher />
      </RequireGuest>
    ),
  },
]);
