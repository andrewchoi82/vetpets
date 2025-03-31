"use client";
import Image from "next/image";
import React, { useEffect, useState } from 'react'



export default function dashboardRecentTestBox() {


    interface Test {
        testId: number;
        name: string;
        dateOrdered: string;
        dateExpected: string;
        status: string;
    }

    const sampData = [
        {
            testId: 1,
            name: "Urinalysis",
            dateOrdered: "02/14/25",
            dateExpected: "02/16/25",
            status: "Pending",
        }
    ];
    const [testData, setTestData] = useState<Test>();


    //this currently sets the sample appointment data to the state
    //change this later to add API to get real data
    useEffect(() => {
        setTestData(sampData[0]);
    }, []);

    return (
        <div className="w-[524px] h-56 relative bg-white rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)] overflow-hidden p-6">
            <div className="text-black text-xl font-bold mb-6">Recent Test</div>
            
            <div className="flex flex-col gap-4">
                <div className="flex items-center">
                    <span className="text-black text-lg font-bold">Test: </span>
                    <span className="text-black text-lg"> {testData?.name}</span>
                </div>

                <div className="flex items-center">
                    <div className="text-neutral-400 text-lg">Date Ordered: {testData?.dateOrdered}</div>
                    <div className="w-[1px] h-6 bg-neutral-400 mx-2"></div>
                    <div className="text-neutral-400 text-lg">Expected by: {testData?.dateExpected}</div>
                </div>

                <div className="flex items-center gap-2 mt-4">
                    <Image
                        src="/img/dashboard/compYellowStatus.svg"
                        alt="Failed to Load"
                        width={24}
                        height={24}
                    />
                    <div className="text-neutral-400 text-lg">Status: {testData?.status}</div>
                </div>
            </div>
        </div>
    );



}
