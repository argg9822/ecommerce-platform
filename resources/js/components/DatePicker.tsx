import * as React from "react";
import * as chrono from "chrono-node";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import InputLabel from "@/components/InputLabel";
import { useCouponFormContext } from "@/context/coupon-form.context";

function formatDate(date: Date | undefined) {
  if (!date) return "";

  const formatted = date.toLocaleDateString("es-CO", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

interface DatePickerProps{
    labelText: string;
    disablePast?: boolean;
    disableFuture?: boolean;
}

export default function DatePicker({ labelText, disablePast, disableFuture }: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  const { data, setData } = useCouponFormContext()

  // Convertimos lo que haya en data.expiration_date a Date (si existe)
  const parsedDate = data.expiration_date ? new Date(data.expiration_date) : undefined

  return (
    <div className="flex flex-col">
      <InputLabel htmlFor="date" value={labelText} />
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={data.expiration_date ?? ""}
          className="bg-background pr-10"
          onChange={(e) => {
            const date = chrono.es.parseDate(e.target.value)
            if (date) {
              setData("expiration_date", format(date, "yyyy-MM-dd"))
            } else {
              setData("expiration_date", e.target.value) // fallback si no parsea
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setOpen(true)
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5 text-blue-50" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="end">
            <Calendar
              mode="single"
              captionLayout="dropdown"
              selected={parsedDate}
              onSelect={(date) => {
                if (date) {
                  setData("expiration_date", format(date, "yyyy-MM-dd"))
                  setOpen(false)
                }
              }}
              disabled={(d: Date) => {
                if (disablePast && d < new Date()) return true
                if (disableFuture && d > new Date()) return true
                return false
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
