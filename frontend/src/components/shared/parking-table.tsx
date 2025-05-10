import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "../ui/card";
import { useParkingSpot } from "@/hooks/useParkingSpot";
import { useMyId } from "@/hooks/useMyId";
import { useBookingState } from "@/hooks/useBookingState";
import { DateSelectionDialog } from "./date-selection-dialog";
import { TimeSelectionDialog } from "./time-selection-dialog";

export function ParkingTable() {
  const { data = [] } = useParkingSpot();
  const { data: myData } = useMyId();
  const userId = myData?.id;

  const {
    selectedSpot,
    setSelectedSpot,
    selectedDate,
    isTimeDialogOpen,
    setIsTimeDialogOpen,
    selectedTimes,
    isPending,
    isTimeDisabled,
    getDisabledDays,
    handleDateSelect,
    handleTimeSelect,
    handleReservation,
  } = useBookingState(userId);

  return (
    <Card className="p-3">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-2xl font-semibold">
              Парковочное место
            </TableHead>
            <TableHead className="text-2xl font-semibold">Адрес</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((parking) => (
            <TableRow
              key={parking.id}
              className="text-xl font-medium cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectedSpot(parking)}
            >
              <TableCell>{parking.identifier}</TableCell>
              <TableCell>{parking.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Всего мест: {data.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <DateSelectionDialog
        isOpen={!!selectedSpot}
        onOpenChange={() => setSelectedSpot(null)}
        selectedSpot={selectedSpot}
        selectedDate={selectedDate}
        disabledDays={getDisabledDays()}
        onDateSelect={handleDateSelect}
      />

      <TimeSelectionDialog
        isOpen={isTimeDialogOpen}
        onOpenChange={setIsTimeDialogOpen}
        selectedSpot={selectedSpot}
        selectedDate={selectedDate}
        selectedTimes={selectedTimes}
        isPending={isPending}
        isTimeDisabled={isTimeDisabled}
        onTimeSelect={handleTimeSelect}
        onReservation={handleReservation}
      />
    </Card>
  );
}
