import { reservationSevice } from "@/services/reservation.service";
import { useQuery } from "@tanstack/react-query";

export const useMyReservations = (userId: string) =>
  useQuery({
    queryKey: ["my-reservations",userId],
    queryFn: async () => {
      const { data } = await reservationSevice.findByReservation(userId);
      return data;
    },
  });