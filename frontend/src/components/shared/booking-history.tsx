import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "../ui/card";
import { useMyReservations } from "@/hooks/useMyReservations";
import { useReservationDelete } from "@/hooks/useReservationDelete";
import type {
  BookingHistoryProps,
  Reservation,
} from "@/types/reservation.types";

export function BookingHistory({ userId }: BookingHistoryProps) {
  const { data } = useMyReservations(userId);
  const { mutate } = useReservationDelete(userId);

  if (!data?.length) return <div>Загрузка...</div>;

  return (
    <Card className="p-3">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>№ Места</TableHead>
            <TableHead>Улица</TableHead>
            <TableHead>Дата</TableHead>
            <TableHead>Время</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((reservation: Reservation) => (
            <TableRow key={reservation.id}>
              <TableCell className="font-medium">
                {reservation.parkingSpot.identifier}
              </TableCell>
              <TableCell className="font-medium">
                {reservation.parkingSpot.location}
              </TableCell>
              <TableCell>
                {new Date(
                  new Date(reservation.reservedDate).setDate(
                    new Date(reservation.reservedDate).getDate() + 1
                  )
                ).toLocaleDateString("ru-RU")}
              </TableCell>
              <TableCell>{reservation.reservedTime}:00</TableCell>
              <TableCell>{reservation.status}</TableCell>
              <TableCell>
                {reservation.status.toLowerCase() === "booked" && (
                  <Button
                    className="text-red-200 hover:text-red-400 hover:cursor-pointer"
                    onClick={() => mutate(reservation.id)}
                  >
                    Отменить
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
