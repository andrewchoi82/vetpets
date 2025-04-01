"use client";
import Image from "next/image";
import React, {useState } from 'react'


type SidebarProps = {
    label: string;
    value: string;
    image: string;
};

//small box components for breed, age, weight, and gender tab in the dashboard
//input the labels and image location from higher up file and set it
//to make one call it like this         <DashboardSmallBox label={"Gender"} value = {"Male"} image={"/img/dashboard/dashboardGender.svg"}/>
export default function dashboardSmallBox({label, value, image}: SidebarProps) {


    return(
            <div className="w-full max-w-[240px] min-w-[180px] h-[108px] relative bg-white rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)] overflow-hidden">
                <div className="absolute left-[10%] top-[20%] w-[45%] inline-flex flex-col justify-start items-start gap-2">
                    <div className="self-stretch text-[#a3a3a3] text-lg whitespace-nowrap overflow-visible">{label}</div>
                    <div className="self-stretch text-black text-3xl whitespace-nowrap overflow-visible">{value}</div>
                </div>
                <div className="absolute right-[10%] top-[50%] -translate-y-1/2">
                    <Image
                        src={image}
                        alt="Failed to Load"
                        width={54}
                        height={54}
                        className="h-auto w-auto"
                    />
                </div>
            </div>
    );

    

}
