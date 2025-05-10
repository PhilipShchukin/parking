import { reservationSevice } from "@/services/reservation.service";
import { useQuery } from "@tanstack/react-query";


export const useFindSpotDate = (spotId: string) =>
  useQuery({
    queryKey: ["spot-date", spotId],
    queryFn: async () => {
      const { data } = await reservationSevice.findBySpotDate(spotId);
      return data
    },
  });