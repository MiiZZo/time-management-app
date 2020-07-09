import React, { useState } from "react";
import { Calendar, Alert } from "antd";
import { CalendarMode } from "antd/lib/calendar/generateCalendar";

export const Organizer = () => {
  const [date, setDate] = useState<moment.Moment | null>(null);
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);
  const handlePanelChange = (date: moment.Moment, mode: CalendarMode) => {
    setDate(date);
  };
  const handleSelect = (date: moment.Moment) => {
    setSelectedDate(date);
  };

  return (
    <div className="Organaizer-Container">
      <Alert
        message={`You selected date: ${
          selectedDate && selectedDate.format("YYYY-MM-DD")
        }`}
      />
      <Calendar
        value={selectedDate ? selectedDate : undefined}
        onSelect={handleSelect}
        onPanelChange={handlePanelChange}
      />
    </div>
  );
};
