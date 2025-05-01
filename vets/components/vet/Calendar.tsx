"use client";
import Image from "next/image"
import { SelectTab } from "../Util/SelectTab";
import React, { useState, useEffect } from "react";
import {
  format,
  addWeeks,
  subWeeks,
  startOfWeek,
  isSameDay,
  parseISO,
  addMinutes,
  setHours,
  setMinutes,
  isWithinInterval,
} from "date-fns";
import Cookies from "js-cookie";

interface TabItem {
  label: string;
  value: "schedule" | "manage";
  iconBasePath: string;
  width: number;
  height: number;
}

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

const hours = Array.from({ length: 11 }, (_, i) => 8 + i); // 8AM - 6PM

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedView, setSelectedView] = useState<"schedule" | "manage">("schedule");
  const currId = Cookies.get("userId");

  const tabs: TabItem[] = [
    {
      label: "Schedule",
      value: "schedule",
      iconBasePath: "/img/health-records",
      width: 19,
      height: 19
    },
    {
      label: "Manage",
      value: "manage",
      iconBasePath: "/img/health-records",
      width: 19,
      height: 19
    }
  ];

  const getIconPath = (tab: TabItem, isSelected: boolean) => {
    const folder = isSelected ? "selected" : "nonSelected";
    const fileName = `${tab.value}-icon.svg`;
    return `${tab.iconBasePath}/${folder}/${fileName}`;
  };

  const selectTabItems = tabs.map((tab) => ({
    label: tab.label,
    value: tab.value,
    icon: (
      <Image
        src={getIconPath(tab, selectedView === tab.value)}
        alt={tab.label}
        width={tab.width}
        height={tab.height}
      />
    )
  }));

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/appointments/totalAppointments?doctorId=${currId}`);
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currId) {
      fetchAppointments();
    }
  }, [currId]);

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);
  const days = Array.from({ length: 7 }, (_, i) => new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + i));

  const getAppointmentsForSlot = (day: Date, hour: number) => {
    const slotStart = setMinutes(setHours(day, hour), 0);
    const slotEnd = addMinutes(slotStart, 59);
    return appointments.filter(appt => {
      const apptStart = parseISO(`${appt.date}T${appt.time}`);
      return isWithinInterval(apptStart, { start: slotStart, end: slotEnd });
    });
  };

  const nextWeek = () => setCurrentDate(addWeeks(currentDate, 1));
  const previousWeek = () => setCurrentDate(subWeeks(currentDate, 1));

  const statusColor = (status: string) => {
    switch (status) {
      case "checkup": return "bg-orange-200";
      case "vaccination": return "bg-purple-200";
      case "illness": return "bg-blue-200";
      case "surgery": return "bg-red-200";
      default: return "bg-gray-200";
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="p-4 overflow-x-auto width-[100%] h-full">
      <div style={{
        display: "flex",
        flexDirection: "column",
        marginBottom: "0px",
        marginTop: "0px"
      }}>
        <div style={{ 
          display: "flex", 
          alignItems: "center",
          marginBottom: "15px",
          marginTop: "0px"
        }}>
          <div style={{ fontSize: 25, fontWeight: 500 }}>Calendar</div>
          <Image
            src="/img/paw.svg"
            alt="Paw Icon"
            width={20}
            height={20}
            style={{ marginLeft: 9 }}
          />
        </div>

        <div style={{ 
          display: "flex", 
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px"
        }}>
          <div style={{ marginBottom: "15px" }}>
            <SelectTab
              tabs={selectTabItems}
              selectedTab={selectedView}
              onSelectTab={(tabValue) => {
                setSelectedView(tabValue as "schedule" | "manage");
              }}
            />
          </div>

          <div className="text-black text-3xl font-normal leading-[55px]">
            {format(weekStart, "MMMM yyyy")}
          </div>

          <div className="flex items-center gap-2">
            <button onClick={previousWeek} className="p-2 text-[#004F82] hover:bg-gray-100 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <h2 className="text-xl font-normal">
              {format(weekStart, "MMM d")} - {format(weekEnd, "MMM d")}
            </h2>
            <button onClick={nextWeek} className="p-2 text-[#004F82] hover:bg-gray-100 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {selectedView === "schedule" ? (
        <>
          <div className="grid grid-cols-[80px_repeat(7,1fr)] gap-x-[23px] pr-4">
            <div className="h-0"></div>
            {days.map((day, idx) => (
              <div 
                key={idx} 
                className={`text-center py-2 rounded-[10px] mb-[26px] ${isSameDay(day, new Date()) ? 'bg-[#004F82] text-white' : 'bg-gray-100'}`}
              >
                {format(day, "EEEE d")}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-[60px_repeat(7,1fr)] gap-x-[23px]">
            {hours.map((hour, index) => (
              <React.Fragment key={hour}>
                <div className="bg-white text-sm text-center py-2 flex items-center justify-center">
                  {format(setHours(new Date(), hour), "h a")}
                </div>
                {days.map((day, i) => (
                  <div key={i} className={`bg-white h-15 border-b-2 border-[#DFDFDF] relative ${index === 0 ? 'border-t-2 border-[#DFDFDF]' : ''}`}>
                    {getAppointmentsForSlot(day, hour).map((appt) => {
                      const apptStart = parseISO(`${appt.date}T${appt.time}`);
                      const minutes = apptStart.getMinutes();
                      const topPosition = (minutes / 60) * 60; // Convert minutes to pixels (assuming 60px height)
                      
                      return (
                        <div
                          key={appt.apptId}
                          className={`absolute inset-x-1 p-2 rounded text-xs text-black ${statusColor(appt.status)}`}
                          style={{ top: `${topPosition}px` }}
                        >
                          <div className="font-semibold truncate">{appt.name}</div>
                          <div className="text-[10px]">{appt.time} • {appt.location}</div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </>
      ) : (
        <div className="w-full h-[calc(100vh-200px)] bg-black flex items-center justify-center">
          <div className="w-96 h-96 relative bg-white rounded-lg shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] border border-Box-stroke" />
            <div className="w-[478px] h-96 relative bg-white rounded-lg shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] border border-Box-stroke" />
        </div>
      )}
    </div>
  );
}
