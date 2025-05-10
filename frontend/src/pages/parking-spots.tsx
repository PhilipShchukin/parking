import { Header } from "@/components/ui/header";
import { ParkingTable } from "@/components/shared/parking-table";

export default function ParkingSpots() {
  return (
    <div>
      <Header className="mb-10" />
      <ParkingTable />
    </div>
  );
}
