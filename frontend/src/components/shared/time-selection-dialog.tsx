import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

interface TimeSelectionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedSpot: { identifier: string } | null;
  selectedDate: Date | null;
  selectedTimes: number[];
  isPending: boolean;
  isTimeDisabled: (date: string, hour: number) => boolean;
  onTimeSelect: (hour: number) => void;
  onReservation: () => void;
}

export function TimeSelectionDialog({
  isOpen,
  onOpenChange,
  selectedSpot,
  selectedDate,
  selectedTimes,
  isPending,
  isTimeDisabled,
  onTimeSelect,
  onReservation,
}: TimeSelectionDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>
          Выберите время для {selectedSpot?.identifier} <br />
          на {selectedDate?.toLocaleDateString()}
        </DialogTitle>

        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 24 }).map((_, i) => {
            const hour = i;
            const dateStr = selectedDate?.toISOString().split("T")[0];
            const isDisabled = dateStr ? isTimeDisabled(dateStr, hour) : false;
            const isSelected = selectedTimes.includes(hour);

            return (
              <button
                key={hour}
                onClick={() => !isDisabled && onTimeSelect(hour)}
                disabled={isDisabled}
                className={`border rounded p-2 transition ${
                  isDisabled
                    ? "bg-gray-300 cursor-not-allowed"
                    : isSelected
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {hour}:00
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Выбрано слотов: {selectedTimes.length}
          </div>
          <Button
            onClick={onReservation}
            disabled={selectedTimes.length === 0 || isPending}
          >
            {isPending ? "Бронирование..." : "Забронировать"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
