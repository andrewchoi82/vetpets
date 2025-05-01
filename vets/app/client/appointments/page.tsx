"use client";
import AppointmentsHeader from "../../../components/Appointments/AppointmentsHeader";
import AppointmentsTable from "../../../components/Appointments/AppointmentsTable";
import ScheduleAppointmentBox from "../../../components/Appointments/ScheduleAppointmentBox";
import { Header } from "../../../components/MainHeader/Header";
import { supabase } from "@/app/lib/supabaseClient";
import { useEffect, useState } from "react";
import { SideBarContainerClient } from "../../../components/MainSideBar/SideBarContainerClient";
import Image from "next/image";
import UpcomingAppointmentCard from "@/components/Appointments/UpcomingAppointmentCard";

export default function Appointments() {
  const [selectedTab, setSelectedTab] = useState<"upcoming" | "past">("upcoming");
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const petId = 1;

  useEffect(() => {
    fetchAppointmentData();
  }, [selectedTab]);

  const fetchAppointmentData = async () => {
    setLoading(true);

    const today = new Date().toISOString().split('T')[0];
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
      .eq('petId', petId);

    if (selectedTab === "upcoming") {
      query = query.gte('date', today);
    } else {
      query = query.lt('date', today);
    }

    query = query.order('date', { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching appointments:", error);
    } else {
      setAppointments(data);
    }

    setLoading(false);
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
          setSelectedTab={setSelectedTab}
          onScheduleClick={() => setIsModalOpen(true)}
        />
        <ScheduleAppointmentBox
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSchedule={handleSchedule}
        />
        {selectedTab === "upcoming" ? (
          <>
            {appointments.length === 0 ? (
              <div style={{ padding: "40px", fontStyle: "italic", color: "#4C4C4C" }}>
                You have no scheduled appointments.
              </div>
            ) : (
              appointments.map((appt) => (
                <UpcomingAppointmentCard style={{ marginTop: 35 }} key={appt.apptId} appt={appt} />
              ))
            )}
          </>
        ) : (
          <AppointmentsTable appointments={appointments} />
        )}

      </div>
    </div>
  );
}
