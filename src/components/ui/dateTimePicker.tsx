"use client";

import * as React from "react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CalendarIcon, AlertCircle } from "lucide-react";

interface DateTimePickerProps {
  date: Date;
  setDate: (date: Date) => void;
  isFromDate?: boolean;
  isToDate?: boolean;
}

export function DateTimePicker({
  date,
  setDate,
  isFromDate = false,
  isToDate = false,
}: DateTimePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [timeError, setTimeError] = React.useState("");

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  const validateTime = (newDate: Date): boolean => {
    const hours = newDate.getHours();

    // Validate fromDate time (9 AM to 9 PM)
    if (isFromDate && (hours < 9 || hours >= 21)) {
      setTimeError("From time must be between 9:00 AM and 9:00 PM");
      return false;
    }

    // Validate toDate time (9 AM to 9 PM)
    if (isToDate && (hours < 9 || hours >= 21)) {
      setTimeError("To time must be between 9:00 AM and 9:00 PM");
      return false;
    }

    setTimeError("");
    return true;
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      newDate.setHours(date.getHours());
      newDate.setMinutes(date.getMinutes());

      // Let the user pick freely, only show error if invalid
      setDate(newDate);
      validateTime(newDate);
    }
  };

  const handleTimeChange = (
    type: "hour" | "minute" | "ampm",
    value: string
  ) => {
    const newDate = new Date(date);

    if (type === "hour") {
      const hourValue = parseInt(value);
      const isPm = newDate.getHours() >= 12;
      newDate.setHours((hourValue % 12) + (isPm ? 12 : 0));
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(value));
    } else if (type === "ampm") {
      const currentHours = newDate.getHours();
      if (value === "PM" && currentHours < 12) {
        newDate.setHours(currentHours + 12);
      } else if (value === "AM" && currentHours >= 12) {
        newDate.setHours(currentHours - 12);
      }
    }

    setDate(newDate);
    validateTime(newDate);
  };

  const getCurrentHour12 = () => {
    const hours = date.getHours();
    return hours % 12 === 0 ? 12 : hours % 12;
  };

  const getCurrentAmPm = () => {
    return date.getHours() >= 12 ? "PM" : "AM";
  };

  return (
    <div>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              timeError && "border-red-500"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              format(date, "MM/dd/yyyy hh:mm aa")
            ) : (
              <span>MM/DD/YYYY hh:mm aa</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <div className="sm:flex">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              initialFocus
            />
            <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
              {/* Hours */}
              <ScrollArea className="w-64 sm:w-auto">
                <div className="flex sm:flex-col p-2">
                  {hours.map((hour) => (
                    <Button
                      key={hour}
                      size="icon"
                      variant={
                        getCurrentHour12() === hour ? "default" : "ghost"
                      }
                      className="sm:w-full shrink-0 aspect-square"
                      onClick={() => handleTimeChange("hour", hour.toString())}
                    >
                      {hour}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="sm:hidden" />
              </ScrollArea>

              {/* Minutes */}
              <ScrollArea className="w-64 sm:w-auto">
                <div className="flex sm:flex-col p-2">
                  {minutes.map((minute) => (
                    <Button
                      key={minute}
                      size="icon"
                      variant={
                        date && date.getMinutes() === minute
                          ? "default"
                          : "ghost"
                      }
                      className="sm:w-full shrink-0 aspect-square"
                      onClick={() =>
                        handleTimeChange("minute", minute.toString())
                      }
                    >
                      {minute.toString().padStart(2, "0")}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="sm:hidden" />
              </ScrollArea>

              {/* AM/PM */}
              <ScrollArea>
                <div className="flex sm:flex-col p-2">
                  {["AM", "PM"].map((ampm) => (
                    <Button
                      key={ampm}
                      size="icon"
                      variant={getCurrentAmPm() === ampm ? "default" : "ghost"}
                      className="sm:w-full shrink-0 aspect-square"
                      onClick={() => handleTimeChange("ampm", ampm)}
                    >
                      {ampm}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      {timeError && (
        <div className="flex items-center mt-1 text-red-500 text-xs">
          <AlertCircle className="w-3 h-3 mr-1" />
          {timeError}
        </div>
      )}
    </div>
  );
}
