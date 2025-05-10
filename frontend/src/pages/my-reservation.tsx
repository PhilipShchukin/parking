import { BookingHistory } from "@/components/shared/booking-history";
import { Header } from "@/components/ui/header";
import { useMyId } from "@/hooks/useMyId";

export default function MyReservations() {
  const { data } = useMyId();

  const userId = data?.id;

  return (
    <div>
      <Header className="mb-10" />
      <BookingHistory userId={userId} />
    </div>
  );
}
