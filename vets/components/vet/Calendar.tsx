"use client";
import React, { useState, useEffect } from "react";
import { format, addWeeks, subWeeks, startOfWeek, endOfWeek, isSameDay, parseISO, addMinutes } from 'date-fns';
import Cookies from 'js-cookie';

interface Appointment {
  apptId: number;
  petId: number;
  name: string;
  date: string;
  time: string;
  location: string;
  status: string;
  doctorId: string;
  duration: number;
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const currId = Cookies.get('userId');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/appointments/totalAppointments?doctorId=${currId}`);
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currId) {
      fetchAppointments();
    }
  }, [currId]);

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + i);
    return date;
  });

  const getAppointmentsForDay = (date: Date) => {
    return appointments.filter(appt => {
      const apptDate = new Date(appt.date);
      return isSameDay(apptDate, date);
    });
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getEndTime = (time: string, duration: number) => {
    const startTime = parseISO(`2000-01-01T${time}`);
    const endTime = addMinutes(startTime, duration);
    return format(endTime, 'h:mm a');
  };

  const nextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1));
  };

  const previousWeek = () => {
    setCurrentDate(subWeeks(currentDate, 1));
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={previousWeek}
          className="px-4 py-2 bg-[#004D81] text-white rounded hover:bg-[#003d6a]"
        >
          Previous Week
        </button>
        <h2 className="text-xl font-bold">
          {format(weekStart, 'MMMM d')} - {format(weekEnd, 'MMMM d, yyyy')}
        </h2>
        <button
          onClick={nextWeek}
          className="px-4 py-2 bg-[#004D81] text-white rounded hover:bg-[#003d6a]"
        >
          Next Week
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div
            key={index}
            className={`border p-2 min-h-[150px] ${
              isSameDay(day, new Date()) ? 'bg-blue-50' : ''
            }`}
          >
            <div className="font-bold mb-2">
              {format(day, 'EEE')}
              <br />
              {format(day, 'd')}
            </div>
            <div className="space-y-1">
              {getAppointmentsForDay(day).map((appt) => (
                <div
                  key={appt.apptId}
                  className={`p-2 rounded text-sm ${
                    appt.status === 'confirmed' ? 'bg-[#004D81] text-white' : 'bg-[#DFDFDF] text-[#4C4C4C]'
                  }`}
                >
                  <div className="font-semibold">{appt.name}</div>
                  <div>{formatTime(appt.time)} - {getEndTime(appt.time, appt.duration)}</div>
                  <div className="text-xs">{appt.location}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
