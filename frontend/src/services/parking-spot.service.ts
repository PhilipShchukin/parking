import { axiosClassic } from "@/api/interceptors"

export const parkingSpotService = {
    async findAllParkingSpot(){
        const response = await axiosClassic.get(`/parking-spots`,)
        
        return response
    },

}