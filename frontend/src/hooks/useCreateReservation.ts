import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface ReservationData {
  userId: string;
  parkingSpotNumber: string;
  reservedDate: string;
  reservedTime: string;
  status: 'BOOKED' | 'CANCELLED';
}

export const useCreateReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ReservationData) => {
       const response = await axios.post("http://localhost:4200/api/reservations", data);
        // const response = await reservationSevice.create(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
    },
  });
}; 