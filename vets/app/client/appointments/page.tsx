"use client";
import AppointmentsHeader from "@/components/Appointments/AppointmentsHeader";
import AppointmentsTable from "@/components/Appointments/AppointmentsTable";
import ScheduleAppointmentBox from "@/components/Appointments/ScheduleAppointmentBox";
import { Header } from "@/components/MainHeader/Header";
import { SideBarContainerClient } from "@/components/MainSideBar/SideBarContainerClient";
import { useEffect, useState } from "react";

export default function Appointments() {
  const [selectedTab, setSelectedTab] = useState<"upcoming" | "past">("upcoming");
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const petId = 1; 

  useEffect(() => {
    fetchAppointmentData();
  }, [selectedTab]);

  const fetchAppointmentData = async () => {
    try {
      const response = await fetch(`/api/appointments?petId=${petId}&filter=${selectedTab}`);
      if (!response.ok) throw new Error("Failed to fetch appointments");
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.log(`Error fetching appointments: ${error}`);
    }
  };

  const handleSchedule = async (newAppointment: any) => {
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newAppointment, petId }),
      });
      if (!response.ok) throw new Error("Failed to schedule appointment");
      fetchAppointmentData();
    } catch (error) {
      console.log("Error scheduling appointment:", error);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <SideBarContainerClient selectedPage="Appointments" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff", overflowY: "auto" }}>
        <Header title="Appointments" showSearchBar={true} />
        <AppointmentsHeader
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          onScheduleClick={() => setIsModalOpen(true)}
        />
        <ScheduleAppointmentBox
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSchedule={handleSchedule}
        />
        <AppointmentsTable appointments={appointments} />
      </div>
    </div>
  );
}
