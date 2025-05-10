import { reservationSevice } from "@/services/reservation.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

export function useReservationDelete(userId: string) {

  const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationKey: ["reservation-delete"],
		mutationFn: (id:string) => reservationSevice.reservationDelete(id),
		onSuccess() {
		  toast.success(`Successfully delete`);
      	queryClient.invalidateQueries({ queryKey: ["my-reservations", userId] });
		},
	  });

	return { mutate }
}