"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getAppointments } from "@/app/lib/api/appointments";
import { getUserById } from "@/app/lib/api/users";

import Cookies from 'js-cookie';

 



export default function DashboardAppointmentsBox() {
  const router = useRouter();
  
  type Appointment = {
    apptId: number;
    petId: number;
    doctorId: number;
    name: string;
    date: string;
    time: string;
    location: string;
    status: string;
  };
  type Pet = {
    breed: string;
    age: string;
    weight: string;
    sex: string;
    sterilized: string;
  };  

  const [pet, setPet] = useState<Pet | null>(null);
  const petId = Cookies.get('petId') || '';
  

  const [appointmentData, setAppointmentData] = useState<Appointment | null>(null);
  const [doctorId, setDoctorId] = useState<string | null>(null);
  const [doctorName, setDoctorName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (!petId) return;
        setIsLoading(true);
        const data = await getAppointments(petId);
        if (Array.isArray(data) && data.length > 0) {
          const sorted = data.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );
          setAppointmentData(sorted[0]);
          setDoctorId(sorted[0].doctorId);
        }
      } catch (error) {
        console.error("Failed to fetch appointments.");
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchAppointments();
  }, []);
  
  useEffect(() => {
    const fetchDoctor = async (id: string) => {
      try {
        const res = await fetch(`/api/me?userId=${id}`, {
          method: 'GET',
        });
        const user = await res.json();
        setDoctorName(`Dr. ${user.lastName}`);
      } catch (error) {
        console.error("Failed to fetch doctor.");
      }
    };
  
    if (doctorId) {
      fetchDoctor(doctorId);
    }
  }, [doctorId]);
  
  const handleAppointmentAction = () => {
    router.push('/client/appointments');
  };

  return (
    <div
        style={{
          width: "full",
          height: "full",
          borderRadius: "10px",
          paddingBottom: "0px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "20px", fontWeight: "500", color: "#4c4c4c" }}>
            Upcoming Appointment
          </div>
        </div>

        {/* Main Content */}
        {isLoading ? (
          <div
            style={{
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "-16px",
              marginRight: "-16px",
              color: "#4c4c4c",
              flex: 1,
              gap: "16px"
            }}
          >
            <div style={{ fontSize: "17px", color: "#919191" }}>
              Loading...
            </div>
          </div>
        ) : appointmentData ? (
          <>
            <div
              style={{
                backgroundColor: "#D9E5EC",
                padding: "16px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginLeft: "-16px",
                marginRight: "-16px",
                color: "#4c4c4c"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                {appointmentData && (
                  <>
                    <div style={{ fontSize: "17px", fontWeight: "normal" }}>
                      {new Date(appointmentData.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div style={{ fontSize: "17px" }}>
                      {new Date(`1970-01-01T${appointmentData.time}Z`).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </div>
                  </>
                )}
                </div>
                <div
                  style={{
                    width: "1px",
                    backgroundColor: "#919191",
                    alignSelf: "stretch",
                    marginTop: "-6px",
                    marginBottom: "-6px",
                  }}
                />

                <div style={{ fontSize: "17px", fontWeight: "normal" }}>
                  {appointmentData?.name}
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                
                {/* MAKE THIS CONDITION RENDER W BACKEND LATER */}
                  <Image
                    src={"/img/dashboard/dr-sarah-pfp.jpg"}
                    alt="Doctor"
                    width={42.4}
                    height={41.5}
                    style={{ borderRadius: "9999px" }}
                  />
              
                <div style={{ fontSize: "15px", color: "#6b7280" }}>{doctorName}</div>
              </div>
            </div>


            {/* Location */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "17px",
                color: "#919191",
                padding: "5px",
                marginTop: "5px"
              }}
            >
              <Image src="/img/dashboard/compNavigation.svg" alt="location" width={18} height={18} />
              <span>{appointmentData?.location}</span>
            </div>

            {/* Status */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "17px",
                color: "#919191",
                padding: "5px",
                paddingBottom: "0px"
              }}
            >
              <Image src="/img/dashboard/compGreenStatus.svg" alt="status" width={18} height={18} />
              <span style={{ color: "#919191", fontStyle: "italic" }}>
                {appointmentData?.status === "confirmed"
                  ? "Appointment confirmed"
                  : "Appointment not confirmed"}
              </span>

            </div>

            {/* Actions */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "16px",
                fontSize: "17px",
                marginBottom: "15px",
              }}
            >
              <button
                style={{
                  fontSize: "15px",
                  color: "#1e3a8a",
                  textDecoration: "underline",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={handleAppointmentAction}
              >
                Cancel
              </button>

              <button
                style={{
                  fontSize: "15px",
                  backgroundColor: "#004d81",
                  color: "white",
                  padding: "4px 10px",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={handleAppointmentAction}
              >
                Reschedule
              </button>
            </div>
          </>
        ) : (
          <div
            style={{
              backgroundColor: "#f4f4f4",
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "-16px",
              marginRight: "-16px",
              color: "#4c4c4c",
              flex: 1,
              gap: "16px"
            }}
          >
            <div style={{ fontSize: "17px", color: "#919191" }}>
              No appointments scheduled
            </div>
            <button
              style={{
                fontSize: "15px",
                backgroundColor: "#004d81",
                color: "white",
                padding: "8px 16px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
              onClick={handleAppointmentAction}
            >
              Schedule
            </button>
          </div>
        )}
      </div>

  );
}
