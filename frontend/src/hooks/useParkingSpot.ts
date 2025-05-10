import { parkingSpotService } from "@/services/parking-spot.service";
import { useQuery } from "@tanstack/react-query";
import type { IParkingSpot } from "@/types/parking.types";

export const useParkingSpot = () =>
  useQuery<IParkingSpot[]>({
    queryKey: ["parking"],
    queryFn: async () => {
      const { data } = await parkingSpotService.findAllParkingSpot();
      return data;
    },
  });