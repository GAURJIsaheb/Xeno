"use client";

import * as React from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export function DateRange() {
  const [selected, setSelected] = React.useState<Date>();

  return (
    <div className="p-4 border rounded-md shadow-md w-fit bg-white">
      <p className="mb-2 font-semibold">
        Selected: {selected ? format(selected, "PPP") : "None"}
      </p>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        className="rounded-md border"
      />
    </div>
  );
}
