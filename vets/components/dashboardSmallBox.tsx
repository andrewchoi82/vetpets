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
//to make one call it like this         <DashboardSmallBox label={"Gender"} value = {"Male"} image={"/dashboardGender.svg"}/>
export default function dashboardSmallBox({label, value, image}: SidebarProps) {


    return(
            <div className="w-60 h-27 relative bg-white rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)] overflow-hidden">
            <div className="w-28 left-[23px] top-[20px] absolute inline-flex flex-col justify-start items-start gap-2">
            <div className="self-stretch h-5 justify-center text-[#a3a3a3] text-lg whitespace-nowrap overflow-visible">{label}</div>
            <div className="self-stretch h-9 justify-center text-black text-3xl whitespace-nowrap overflow-visible">{value}</div>
            </div>
            <Image
                    src={image}
                    alt="Failed to Load"
                    width={54}
                    height={54}
                    className="left-[193px] top-[28px] absolute h-auto w-auto max-w-[54px] max-h-[54px] -translate-x-1/2"
                    />
        </div>
    );

    

}
