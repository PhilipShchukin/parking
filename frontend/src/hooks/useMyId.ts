import { reservationSevice } from "@/services/reservation.service";
import { useQuery } from "@tanstack/react-query";

export const useMyId = () =>
  useQuery({
    queryKey: ["my-id"],
    queryFn: async () => {
      const { data } = await reservationSevice.findMyId();
      return data;
    },
  });