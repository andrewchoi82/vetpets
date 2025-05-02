"use client";
import React, { useState } from "react";
import Image from "next/image";

const getWeekDates = (ref = new Date()): Date[] => {
  const offset = ref.getDay() === 0 ? -6 : 1 - ref.getDay();
  const monday = new Date(ref);
  monday.setDate(ref.getDate() + offset);
  monday.setHours(0, 0, 0, 0);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
};

export default function WeekCalendar() {
  const [weekDates, setWeekDates] = useState(getWeekDates());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const timeSlots = [
    "9:00 am", "9:30 am", "10:00 am", "10:30 am", "11:00 am", "11:30 am",
    "12:00 pm", "12:30 pm", "1:00 pm", "1:30 pm", "2:00 pm", "2:30 pm",
    "3:00 pm", "3:30 pm"
  ];

  const handlePrevMonth = () => {
    const newRef = new Date(weekDates[0]);
    const currentDay = newRef.getDate(); // Store current day
    newRef.setDate(1); // Set to 1st to avoid skipping months for days 29-31
    newRef.setMonth(newRef.getMonth() - 1);
    
    // Get last day of the target month
    const lastDayOfMonth = new Date(newRef.getFullYear(), newRef.getMonth() + 1, 0).getDate();
    // Set to either the same day or last day of month if original day doesn't exist
    newRef.setDate(Math.min(currentDay, lastDayOfMonth));
    
    const newWeek = getWeekDates(newRef);
    setWeekDates(newWeek);
 
    // Keep selection if date is still in range
    const stillInWeek = selectedDate && newWeek.some(d => d.toDateString() === selectedDate.toDateString());
    if (!stillInWeek) {
      setSelectedDate(null);
      setSelectedTime(null);
    }
  };
 
  const handleNextMonth = () => {
    const newRef = new Date(weekDates[0]);
    const currentDay = newRef.getDate(); // Store current day
    newRef.setDate(1); // Set to 1st to avoid skipping months for days 29-31
    newRef.setMonth(newRef.getMonth() + 1);
    
    // Get last day of the target month
    const lastDayOfMonth = new Date(newRef.getFullYear(), newRef.getMonth() + 1, 0).getDate();
    // Set to either the same day or last day of month if original day doesn't exist
    newRef.setDate(Math.min(currentDay, lastDayOfMonth));
    
    const newWeek = getWeekDates(newRef);
    setWeekDates(newWeek);
 
    // Keep selection if date is still in range
    const stillInWeek = selectedDate && newWeek.some(d => d.toDateString() === selectedDate.toDateString());
    if (!stillInWeek) {
      setSelectedDate(null);
      setSelectedTime(null);
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 600, fontFamily: "sans-serif", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 20 }}>
        <Image
          src="/img/calendar/weekCalendar/cal-arrow-left.svg"
          alt="prev"
          width={16}
          height={16}
          onClick={handlePrevMonth}
          style={{ cursor: "pointer" }}
        />
        <Image src="/img/calendar/weekCalendar/calendar-icon.svg" alt="calendar" width={16} height={16} />
        <div style={{ fontSize: 16, fontWeight: 500 }}>
          {weekDates[0].toLocaleString("default", { month: "long" })} {weekDates[0].getFullYear()}
        </div>
        <Image
          src="/img/calendar/weekCalendar/cal-arrow-right.svg"
          alt="next"
          width={16}
          height={16}
          onClick={handleNextMonth}
          style={{ cursor: "pointer" }}
        />
      </div>

      {/* Week Days with arrows on sides */}
<div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginBottom: 24 }}>
  {/* Left arrow beside days */}
  <Image
    src="/img/calendar/weekCalendar/day-arrow-left.svg"
    alt="prev days"
    width={14}
    height={14}
    onClick={handlePrevMonth}
    style={{ cursor: "pointer" }}
  />

  {/* Week Day Buttons */}
  <div style={{ display: "flex", gap: 12 }}>
    {weekDates.map((date) => {
      const isSelected = selectedDate?.toDateString() === date.toDateString();
      return (
        <div key={date.toDateString()} style={{ textAlign: "center" }}>
          <button
            onClick={() => {
              setSelectedDate(date);
              setSelectedTime(null);
            }}
            style={{
              borderRadius: 8,
              backgroundColor: isSelected ? "#1e3a8a" : "transparent",
              color: isSelected ? "#fff" : "#1f2937",
              border: "none",
              padding: "6px 10px",
              minWidth: 48,
              textAlign: "center",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 500,
              lineHeight: 1.2,
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ fontSize: 12 }}>{date.toLocaleDateString("en-US", { weekday: "short" })}</div>
            <div style={{ fontSize: 16 }}>{date.getDate()}</div>
          </button>
        </div>
      );
    })}
  </div>

  {/* Right arrow beside days */}
  <Image
    src="/img/calendar/weekCalendar/day-arrow-right.svg"
    alt="next days"
    width={14}
    height={14}
    onClick={handleNextMonth}
    style={{ cursor: "pointer" }}
  />
</div>


      {/* Time Slots */}
      {selectedDate && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {timeSlots.map((slot) => (
            <button
              key={slot}
              onClick={() => setSelectedTime(slot)}
              style={{
                padding: "10px 16px",
                borderRadius: 6,
                backgroundColor: selectedTime === slot ? "#1e3a8a" : "#f9fafb",
                color: selectedTime === slot ? "#fff" : "#374151",
                border: "1px solid #d1d5db",
                cursor: "pointer",
                minWidth: 100,
                textAlign: "center",
              }}
            >
              {slot}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
