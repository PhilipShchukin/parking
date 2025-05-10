import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ParkingSpot {
  id: string;
  identifier: string;
  location: string;
}

interface ParkingSpotsTableProps {
  spots: ParkingSpot[];
  onSpotSelect: (spot: ParkingSpot) => void;
}

export function ParkingSpotsTable({
  spots,
  onSpotSelect,
}: ParkingSpotsTableProps) {
  return (
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
        {spots.map((parking) => (
          <TableRow
            key={parking.id}
            className="text-xl font-medium cursor-pointer hover:bg-gray-100"
            onClick={() => onSpotSelect(parking)}
          >
            <TableCell>{parking.identifier}</TableCell>
            <TableCell>{parking.location}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Всего мест: {spots.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
