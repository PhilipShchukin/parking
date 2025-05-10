export type BookingHistoryProps = {
    userId: string;
  };
  
export type Reservation = {
    id: string;
    parkingSpot: {
      identifier: string;
      location: string;
    };
    reservedDate: string;
    reservedTime: string;
    status: "booked" | "cancelled";
  };