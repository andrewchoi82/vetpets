"use client";
import Image from "next/image";
import React, { useEffect, useState } from 'react'



export default function dashboardAppointmentsBox() {


    interface Appointment {
        apptId: number;
        name: string;
        date: string;
        time: string;
        location: string;
        status: string;
    }

    const sampData = [
        {
            apptId: 1,
            name: "Annual Check-Up",
            date: "April 24, 2025",
            time: "11 AM",
            location: "1544 W Slauson Ave, Los Angeles, CA 90047",
            status: "Appointment confirmed",
        }
    ];
    const [appointmentData, setAppointmentData] = useState<Appointment>();


    //this currently sets the sample appointment data to the state
    //change this later to add API to get real data
    useEffect(() => {
        setAppointmentData(sampData[0]);
    }, []);

    return (
        <div className="flex flex-col w-[524px] h-[280px] bg-white rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)] p-6 gap-6">
            <div className="text-black text-xl font-bold">Upcoming Appointment</div>
            
            <div className="flex w-[524px] -mx-6">
                <div className="w-2 h-16 bg-sky-800" />
                <div className="h-16 bg-zinc-100 px-4 flex-1">
                    <div className="flex items-center h-full gap-4">
                        <div className="flex flex-col justify-center gap-1">
                            <div className="text-black text-lg">{appointmentData?.date}</div>
                            <div className="text-black text-lg">{appointmentData?.time}</div>
                        </div>
                        <div className="w-[1px] h-12 bg-neutral-400 self-center"></div>
                        <div className="text-black text-lg self-center">{appointmentData?.name}</div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2.5">
                    <Image
                        src={"/img/dashboard/compNavigation.svg"}
                        alt="Failed to Load"
                        width={20}
                        height={20}
                    />
                    <div className="text-neutral-400 text-lg">{appointmentData?.location}</div>
                </div>

                <div className="flex items-center gap-2">
                    <Image
                        src={"/img/dashboard/compGreenStatus.svg"}
                        alt="Failed to Load"
                        width={24}
                        height={24}
                    />
                    <div className="text-neutral-400 text-lg">{appointmentData?.status}</div>
                </div>
            </div>
        </div>
    );



}
