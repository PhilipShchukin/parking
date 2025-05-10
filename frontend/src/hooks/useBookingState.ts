import { useState } from "react";
import { useCreateReservation } from "./useCreateReservation";
import { useFindSpotDate } from "./useFindSpotDate";
import { toast } from "sonner";

interface ParkingSpot {
  id: string;
  identifier: string;
  location: string;
}

interface DisabledTime {
  date: string;
  hour: number;
}

export function useBookingState(userId: string | undefined) {
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isTimeDialogOpen, setIsTimeDialogOpen] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState<number[]>([]);

  const spotId = String(selectedSpot?.id);
  const { data: id } = useFindSpotDate(spotId);
  const { mutate: createReservation, isPending } = useCreateReservation();

  const disabledTimes = id && id.length > 0
    ? id
        .filter((item: { status: string }) => item.status === "BOOKED")
        .map((item: { reservedDate: string | number | Date; reservedTime: string }) => {
          const date = new Date(item.reservedDate);
          const dateStr = date.toISOString().split("T")[0];
          const [hour] = item.reservedTime.split(":");
          return {
            date: dateStr,
            hour: parseInt(hour),
          };
        })
    : [];

  const isTimeDisabled = (date: string, hour: number) => {
    return disabledTimes.some(
      (disabledTime: DisabledTime) =>
        disabledTime.date === date && disabledTime.hour === hour
    );
  };

  const isDayDisabled = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    const dayHours = disabledTimes.filter(
      (time: { date: string }) => time.date === dateStr
    );
    return dayHours.length === 24;
  };

  const getDisabledDays = () => {
    const dates = new Set(
      disabledTimes.map((time: { date: string }) => time.date)
    );
    return Array.from(dates)
      .map((dateStr: unknown) => new Date(dateStr as string))
      .filter((date) => isDayDisabled(date))
      .map((date) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 1);
        return newDate;
      });
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setIsTimeDialogOpen(true);
      setSelectedTimes([]);
    }
  };

  const handleTimeSelect = (hour: number) => {
    setSelectedTimes((prev) => {
      if (prev.includes(hour)) {
        return prev.filter((h) => h !== hour);
      } else {
        return [...prev, hour].sort((a, b) => a - b);
      }
    });
  };

  const handleReservation = () => {
    if (!selectedSpot || !selectedDate || selectedTimes.length === 0) {
      toast.error("Пожалуйста, выберите место, дату и время");
      return;
    }

    const dateStr = selectedDate.toISOString().split("T")[0];

    selectedTimes.forEach((hour) => {
      createReservation({
        userId: `${userId}`,
        parkingSpotNumber: selectedSpot.id,
        reservedDate: dateStr,
        reservedTime: `${hour}`,
        status: "BOOKED",
      });
    });

    toast.success("Бронирование успешно создано");
    setIsTimeDialogOpen(false);
    setSelectedSpot(null);
    setSelectedDate(null);
    setSelectedTimes([]);
  };

  return {
    selectedSpot,
    setSelectedSpot,
    selectedDate,
    isTimeDialogOpen,
    setIsTimeDialogOpen,
    selectedTimes,
    isPending,
    disabledTimes,
    isTimeDisabled,
    getDisabledDays,
    handleDateSelect,
    handleTimeSelect,
    handleReservation,
  };
} 