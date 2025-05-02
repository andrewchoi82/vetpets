"use client";
import AppointmentsHeader from "../../../components/Appointments/AppointmentsHeader";
import AppointmentsTable from "../../../components/Appointments/AppointmentsTable";
import { Header } from "../../../components/MainHeader/Header";
import { supabase } from "@/app/lib/supabaseClient";
import { useEffect, useState } from "react";
import { SideBarContainerClient } from "../../../components/MainSideBar/SideBarContainerClient";
import Image from "next/image";
import UpcomingAppointmentCard from "@/components/Appointments/UpcomingAppointmentCard";
import ScheduleAppointmentPage from "@/components/Appointments/ScheduleAppointmentPage";

export default function Appointments() {
  const [selectedTab, setSelectedTab] = useState<"upcoming" | "past" | null>("upcoming");
  const [allAppointments, setAllAppointments] = useState<{
    upcoming: any[];
    past: any[];
  }>({ upcoming: [], past: [] });
  const [loading, setLoading] = useState(true);
  const [schedulingMode, setSchedulingMode] = useState(false);

  const petId = 1;

  useEffect(() => {
    fetchAllAppointmentData();
  }, []); // Only fetch once when component mounts

  const fetchAllAppointmentData = async () => {
    setLoading(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Fetch all appointments in one query
      const { data: allData, error } = await supabase
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
        .eq('petId', petId)
        .order('date', { ascending: false });

      if (error) throw error;

      // Split the data into upcoming and past appointments
      const upcoming = allData.filter(appt => appt.date >= today);
      const past = allData.filter(appt => appt.date < today);

      setAllAppointments({ upcoming, past });
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
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
      setSchedulingMode(false);
      setSelectedTab("upcoming");
      fetchAllAppointmentData(); // Refresh all data
    } catch (error) {
      console.log("Error scheduling appointment:", error);
    }
  };

  const handleTabSelect = (tab: "upcoming" | "past") => {
    if (schedulingMode) {
      setSchedulingMode(false);
    }
    setSelectedTab(tab);
  };

  const handleScheduleClick = () => {
    setSchedulingMode(true);
    setSelectedTab(null);
  };

  if (loading) {
    return (
      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <SideBarContainerClient selectedPage="Appointments" />
        <div style={{ 
          flex: 1, 
          position: "relative", 
          backgroundColor: "#fff", 
          marginLeft: "120px" 
        }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff",
            zIndex: 10
          }}>
            <Image
              src="/img/vetrail-logo.svg"
              alt="Loading..."
              width={80}
              height={80}
              style={{
                animation: "spin 1.5s linear infinite"
              }}
            />
          </div>

          <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  const currentAppointments = selectedTab ? allAppointments[selectedTab] : [];

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <SideBarContainerClient selectedPage="Appointments" />
      <div style={{ 
        flex: 1, 
        display: "flex", 
        flexDirection: "column", 
        background: "#fff", 
        overflowY: "auto",
        marginLeft: "120px"
      }}>
        <Header title="" showSearchBar={true} />
        <AppointmentsHeader
          selectedTab={selectedTab}
          setSelectedTab={handleTabSelect}
          onScheduleClick={handleScheduleClick}
        />
        {schedulingMode ? (
          <div style={{ marginTop: "30px" }}>
            <ScheduleAppointmentPage
              onSubmit={handleSchedule}
              onCancel={() => {
                setSchedulingMode(false);
                setSelectedTab("upcoming");
              }}
            />
          </div>
        ) : selectedTab === "upcoming" ? (
          currentAppointments.length === 0 ? (
            <div style={{ padding: "40px", fontStyle: "italic", color: "#4C4C4C" }}>
              You have no scheduled appointments.
            </div>
          ) : (
            currentAppointments.map((appt) => (
              <UpcomingAppointmentCard key={appt.apptId} appt={appt} style={{ marginTop: 35 }} />
            ))
          )
        ) : selectedTab === "past" ? (
          <AppointmentsTable appointments={currentAppointments} />
        ) : null}
      </div>
    </div>
  );
}