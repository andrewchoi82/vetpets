"use client";
import AppointmentsHeader from "../../../components/Appointments/AppointmentsHeader";
import AppointmentsTable from "../../../components/Appointments/AppointmentsTable";
import ScheduleAppointmentBox from "../../../components/Appointments/ScheduleAppointmentBox";
import { Header } from "../../../components/MainHeader/Header";
import { supabase } from "@/app/lib/supabaseClient";
import { useEffect, useState } from "react";
import { SideBarContainerClient } from "../../../components/MainSideBar/SideBarContainerClient";


export default function Appointments() {
  const [selectedTab, setSelectedTab] = useState<"upcoming" | "past">("upcoming");
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const petId = 1; 

  useEffect(() => {
    fetchAppointmentData();
  }, [selectedTab]);

  console.log(appointments);

  const fetchAppointmentData = async () => {
    const today = new Date().toISOString().split('T')[0]; // get YYYY-MM-DD
  
    let query = supabase
      .from('appointments')
      .select(`
        apptId,
        date,
        time,
        name,
        status,
        pets (
          petId,
          doctorId,
          users!pets_doctorId_fkey (
            firstName,
            lastName
          )
        )
      `)
      .eq('petId', petId);  // keep your petId filter
  
    // Add the date filter depending on the selectedTab
    if (selectedTab === "upcoming") {
      query = query.gte('date', today);  // upcoming = today or future
    } else {
      query = query.lt('date', today);   // past = before today
    }
  
    const { data, error } = await query;
  
    if (error) {
      console.error("Error fetching pets with doctor names:", error);
    } else {
      setAppointments(data);
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
