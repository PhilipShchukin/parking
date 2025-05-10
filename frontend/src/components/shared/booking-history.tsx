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
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[100px]">№ Места</TableHead>
              <TableHead className="min-w-[150px]">Улица</TableHead>
              <TableHead className="min-w-[100px] hidden md:table-cell">
                Дата
              </TableHead>
              <TableHead className="min-w-[80px] hidden sm:table-cell">
                Время
              </TableHead>
              <TableHead className="min-w-[100px] hidden sm:table-cell">
                Статус
              </TableHead>
              <TableHead className="min-w-[100px]">Действия</TableHead>
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
                <TableCell className="hidden md:table-cell">
                  {new Date(
                    new Date(reservation.reservedDate).setDate(
                      new Date(reservation.reservedDate).getDate() + 1
                    )
                  ).toLocaleDateString("ru-RU")}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {reservation.reservedTime}:00
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {reservation.status}
                </TableCell>
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
      </div>
    </Card>
  );
}
