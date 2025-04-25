"use client";
import Image from "next/image";
import React from "react";

type SidebarProps = {
  label: string;
  value: string;
  image: string;
};


//small box components for breed, age, weight, and sex tab in the dashboard
//input the labels and image location from higher up file and set it
//to make one call it like this         <DashboardSmallBox label={"Sex"} value = {"Male"} image={"/img/dashboard/dashboardSex.svg"}/>
export default function DashboardSmallBox({ label, value, image }: SidebarProps) {
    return (
      <div className="w-full max-w-[180px] min-w-[140px] h-[84px] bg-white rounded-[10px] border border-[#e5e5e5] flex items-center justify-between px-5 py-2">
        <div className="flex flex-col justify-center">
          <div className="text-sm text-gray-400">{label}</div>
          <div className="text-xl font-medium text-black">{value}</div>
        </div>
        <div className="w-9 h-9 flex items-center justify-center mt-[2px]">
            <Image
                src={image}
                alt="icon"
                width={36}
                height={36}
                className="object-contain max-w-[34px] max-h-[34px]"
            />
        </div>
      </div>


    );
  }


