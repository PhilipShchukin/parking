import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Calendar } from "../ui/calendar";

interface DateSelectionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedSpot: { identifier: string } | null;
  selectedDate: Date | null;
  disabledDays: Date[];
  onDateSelect: (date: Date | undefined) => void;
}

export function DateSelectionDialog({
  isOpen,
  onOpenChange,
  selectedSpot,
  selectedDate,
  disabledDays,
  onDateSelect,
}: DateSelectionDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-80">
        <DialogTitle>Выбор даты для {selectedSpot?.identifier}</DialogTitle>

        <Calendar
          mode="single"
          selected={selectedDate ?? undefined}
          onSelect={onDateSelect}
          className="w-full"
          disabled={[{ before: new Date() }, ...disabledDays]}
        />
      </DialogContent>
    </Dialog>
  );
}
