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
          gap: "8px",
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="text-base md:text-xl font-medium text-[#4c4c4c]">
            Upcoming Appointment
          </div>
        </div>

        {/* Main Content */}
        {isLoading ? (
          <div className="p-4 md:p-5 flex flex-col items-center justify-center -mx-4 md:-mx-5 text-[#4c4c4c] flex-1 gap-4">
            <div className="text-sm md:text-lg text-[#919191]">
              Loading...
            </div>
          </div>
        ) : appointmentData ? (
          <>
            <div className="bg-[#D9E5EC] p-4 md:p-5 flex justify-between items-center -mx-4 text-[#4c4c4c] ">
              <div className="flex items-center gap-4 md:gap-6">
                <div className="flex flex-col">
                  {appointmentData && (
                    <>
                      <div className="text-sm md:text-lg font-normal truncate">
                        {new Date(appointmentData.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      <div className="text-sm md:text-lg truncate">
                        {new Date(`1970-01-01T${appointmentData.time}Z`).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </div>
                    </>
                  )}
                </div>
                <div className="w-px bg-[#919191] self-stretch -my-1.5" />

                <div className="text-sm md:text-lg font-normal truncate">
                  {appointmentData?.name}
                </div>
              </div>

              <div className="flex items-center gap-2 md:gap-3">
                <Image
                  src={"/img/dashboard/dr-sarah-pfp.jpg"}
                  alt="Doctor"
                  width={42.4}
                  height={41.5}
                  className="rounded-full"
                />
                <div className="text-xs md:text-base text-[#6b7280] truncate">{doctorName}</div>
              </div>
            </div>

            {/* Location and Status */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 md:gap-4 text-sm md:text-lg text-[#919191] p-1 md:p-1.5">
                <Image src="/img/dashboard/compNavigation.svg" alt="location" width={18} height={18} />
                <span className="truncate">{appointmentData?.location}</span>
              </div>

              <div className="flex items-center gap-3 md:gap-4 text-sm md:text-lg text-[#919191] p-1 md:p-1.5">
                <Image src="/img/dashboard/compGreenStatus.svg" alt="status" width={18} height={18} />
                <span className="italic truncate">
                  {appointmentData?.status === "confirmed"
                    ? "Appointment confirmed"
                    : "Appointment not confirmed"}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 md:gap-6 text-sm md:text-lg mt-[-10px]">
              <button
                className="text-xs md:text-base text-[#1e3a8a] underline bg-transparent border-none cursor-pointer"
                onClick={handleAppointmentAction}
              >
                Cancel
              </button>

              <button
                className="text-xs md:text-base bg-[#004d81] text-white px-2.5 md:px-3 py-1 md:py-1.5 rounded-md border-none cursor-pointer"
                onClick={handleAppointmentAction}
              >
                Reschedule
              </button>
            </div>
          </>
        ) : (
          <div className="bg-[#f4f4f4] p-4 md:p-5 flex flex-col items-center justify-center -mx-4 md:-mx-5 text-[#4c4c4c] flex-1 gap-4">
            <div className="text-sm md:text-lg text-[#919191]">
              No appointments scheduled
            </div>
            <button
              className="text-xs md:text-base bg-[#004d81] text-white px-4 md:px-6 py-2 md:py-2.5 rounded-md border-none cursor-pointer"
              onClick={handleAppointmentAction}
            >
              Schedule
            </button>
          </div>
        )}
      </div>

  );
}
