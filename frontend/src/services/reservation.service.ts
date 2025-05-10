import { axiosClassic, axiosWithAuth } from "@/api/interceptors"
import type { ReservationData } from "@/hooks/useCreateReservation"

export const reservationSevice = {
    async findMyId(){
        const response = await axiosWithAuth.get(`/auth/me`,)
        
        return response
    },

    async findByReservation(userId: string){
        const response = await axiosClassic.get(`/reservations/user/${userId}`,)
        
        return response
    },

    async reservationDelete(id: string){
        const response = await axiosClassic.delete(`/reservations/${id}`,)
        
        return response
    },


    async findBySpotDate(spotId: string){
        const response = await axiosClassic.get(`/reservations/${spotId}`,)
        
        return response
    },

    async createReservedSpot(data:ReservationData){
      console.log(data)

        const response = await axiosClassic.post("/reservations", data)
        
        return response
    },


    // findBySpotAndDate: async (parkingSpotId: string, date: string) => {
    //     const response = await axiosClassic.get(`/reservations`, {
    //       params: {
    //         parkingSpotId,
    //         date,
    //       },
    //     });
    //     return response.data;
    //   },

    
      // create: async ( data: ReservationData) => {
      //   const response = await axiosClassic.post(`/reservations`, {
      //     data
      //   });
      //   return response.data;
      // },
    
}