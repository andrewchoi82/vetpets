"use client";
import Image from "next/image";
import React, { useEffect, useState } from 'react'



export default function dashboardBillingBox() {


    interface Billing {
        billingId: number;
        name: string;
        date: string;
        cost: number;
    }

    const sampData = [
        {
            billingId: 1,
            name: "Annual Check-Up",
            date: "03/16/25",
            cost: 185.00,
        },
        {
            billingId: 2,
            name: "Vaccination Appointment",
            date: "03/16/25 ",
            cost: 50.00,
        },
        {
            billingId: 3,
            name: "Emergency Visit",
            date: "05/32/25 ",
            cost: 80.00,
        },
        {
            billingId: 4,
            name: "Annual Check-up",
            date: "03/16/24",
            cost: 185.00,
        },
        {
            billingId: 5,
            name: "Annual Check-up",
            date: "03/16/24",
            cost: 185.00,
        }
    ];
    const [billingData, setBillingData] = useState<Billing[]>([]);


    //this currently sets the sample appointment data to the state
    //change this later to add API to get real data
    useEffect(() => {
        setBillingData(sampData);
    }, []);

    return (
        <div className="w-[524px] h-56 relative bg-white rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)] overflow-hidden">
            <div className="left-[23px] top-[7px] absolute justify-center text-black text-xl font-bold leading-[48.40px]">Billing</div>
            <div className="w-6 h-6 left-[23px] top-[217px] absolute" />
            <div className="w-20 h-10 left-[23px] top-[55px] absolute" />
            
            {billingData.slice(0, 4).map((billing, index) => (
                <React.Fragment key={billing.billingId}>
                    <div className="w-[460px] left-[23px] absolute inline-flex justify-between items-center" style={{top: `${55 + (index * 40)}px`}}>
                        <div className="flex justify-start items-center gap-3">
                            <div className="w-[100px] justify-center text-black text-lg font-normal leading-10">{billing.date}</div>
                            <div className="w-[1.5px] h-6 bg-neutral-400"></div>
                            <div className="justify-center text-black text-lg font-normal leading-10">{billing.name}</div>
                        </div>
                        <div className="justify-center text-neutral-400 text-lg font-normal leading-10">${billing.cost.toFixed(2)}</div>
                    </div>
                    {index < Math.min(billingData.length, 4) - 1 && (
                        <div className="w-[468px] h-0 left-[23px] absolute outline-[0.50px] outline-offset-[-0.25px] outline-neutral-400" style={{top: `${95 + (index * 40)}px`}} />
                    )}
                </React.Fragment>
            ))}
        </div>
    );



}
