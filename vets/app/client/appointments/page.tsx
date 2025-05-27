"use client";
import AppointmentsHeader from "../../../components/Appointments/AppointmentsHeader";
import AppointmentsTable from "../../../components/Appointments/AppointmentsTable";
import { HeaderNew } from "../../../components/MainHeader/HeaderNew";
import { supabase } from "@/app/lib/supabaseClient";
import { useEffect, useState } from "react";
import { SideBarContainerClient } from "../../../components/MainSideBar/SideBarContainerClient";
import Image from "next/image";
import UpcomingAppointmentCard from "@/components/Appointments/UpcomingAppointmentCard";
import ScheduleAppointmentPage from "@/components/Appointments/ScheduleAppointmentPage";
import TempPastAppointment from "@/components/Appointments/TempPastAppointments";

export default function Appointments() {
  const [selectedTab, setSelectedTab] = useState<"upcoming" | "past" | null>(
    "upcoming"
  );
  const [allAppointments, setAllAppointments] = useState<{
    upcoming: any[];
    past: any[];
  }>({ upcoming: [], past: [] });
  const [loading, setLoading] = useState(true);
  const [schedulingMode, setSchedulingMode] = useState(false);
  const [showConfirmed, setShowConfirmed] = useState(false);
  const [selectedPastAppointment, setSelectedPastAppointment] = useState<
    any | null
  >(null);

  const petId = 1;

  useEffect(() => {
    fetchAllAppointmentData();
  }, []);

  const fetchAllAppointmentData = async () => {
    setLoading(true);
    try {
      const today = new Date().toISOString().split("T")[0];
      const { data: allData, error } = await supabase
        .from("appointments")
        .select(
          `
          apptId,
          date,
          time,
          name,
          clinic_name,
          booked_for,
          vet_name,
          location,
          status,
          pets (
            petId,
            doctorId,
            users!pets_doctorId_fkey (
              firstName,
              lastName
            )
          )
        `
        )
        .eq("petId", petId)
        .order("date", { ascending: false });

      if (error) throw error;

      const upcoming = allData.filter((appt) => appt.date >= today);
      const past = allData.filter((appt) => appt.date < today);

      console.log({ upcoming, past });

      setAllAppointments({ upcoming, past });
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSchedule = async (newAppointment: any) => {
    // Insert into Supabase
    const { data, error } = await supabase
      .from("appointments") // your Supabase table name
      .insert([newAppointment]);

    if (error) {
      console.error("Error scheduling appointment:", error);
      return;
    }

    setSchedulingMode(false);
    setSelectedTab(null);

    setAllAppointments((prev) => ({
      ...prev,
      upcoming: [...prev.upcoming, newAppointment],
    }));
  };

  const handleTabSelect = (tab: "upcoming" | "past") => {
    if (schedulingMode) setSchedulingMode(false);
    setSelectedTab(tab);
    setSelectedPastAppointment(null);
  };

  const handleScheduleClick = () => {
    setSchedulingMode(true);
    setSelectedTab(null);
  };

  if (loading) {
    return (
      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <SideBarContainerClient selectedPage="Appointments" />
        <div
          style={{
            flex: 1,
            position: "relative",
            backgroundColor: "#f9f9f9",
            marginLeft: "120px",
          }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f9f9f9",
              zIndex: 10,
            }}>
            <Image
              src="/img/vetrail-logo.svg"
              alt="Loading..."
              width={80}
              height={80}
              style={{ animation: "spin 1.5s linear infinite" }}
            />
          </div>

          <style jsx>{`
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
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
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          background: "#fff",
          overflowY: "auto",
          marginLeft: "120px",
        }}>
        <HeaderNew title="" showSearchBar={true} />
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
        ) : !selectedTab ? (
          allAppointments.upcoming.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px",
                color: "#4C4C4C",
                fontStyle: "italic",
              }}>
              You have no upcoming appointments.
              <button
                onClick={handleScheduleClick}
                style={{
                  marginTop: "15px",
                  padding: "8px 16px",
                  backgroundColor: "#004d81",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}>
                Schedule Appointment
              </button>
            </div>
          ) : (
            allAppointments.upcoming.map((appt) => (
              <UpcomingAppointmentCard
                key={appt.apptId}
                appt={appt}
                style={{ marginTop: 35 }}
              />
            ))
          )
        ) : selectedTab === "upcoming" ? (
          currentAppointments.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px",
                color: "#4C4C4C",
                fontStyle: "italic",
              }}>
              You have no upcoming appointments.
              <button
                onClick={handleScheduleClick}
                style={{
                  marginTop: "15px",
                  padding: "8px 16px",
                  backgroundColor: "#004d81",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}>
                Schedule Appointment
              </button>
            </div>
          ) : (
            currentAppointments.map((appt) => (
              <UpcomingAppointmentCard
                key={appt.apptId}
                appt={appt}
                style={{ marginTop: 35 }}
              />
            ))
          )
        ) : selectedTab === "past" ? (
          selectedPastAppointment ? (
            <TempPastAppointment
              appt={selectedPastAppointment}
              onClose={() => setSelectedPastAppointment(null)}
            />
          ) : currentAppointments.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px",
                color: "#4C4C4C",
                fontStyle: "italic",
              }}>
              You have no past appointments.
            </div>
          ) : (
            <AppointmentsTable
              appointments={currentAppointments}
              onRowClick={(appt) => setSelectedPastAppointment(appt)}
            />
          )
        ) : null}
      </div>
    </div>
  );
}
