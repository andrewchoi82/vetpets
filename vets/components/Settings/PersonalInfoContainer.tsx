"use client";
import Image from "next/image";
import React from "react";

type SidebarProps = {
  style?: React.CSSProperties;
  phoneNumber: string;
  email: string;
  contactPref: string;
  address: string;
};

export default function PersonalInfoContainer({
  style,
  phoneNumber,
  email,
  contactPref,
  address,
}: SidebarProps) {
  return (
    <div
      style={{
        display: "flex",
        border: "1.3px solid #DFDFDF",
        borderRadius: "10px",
        flexDirection: "column",
        width: "850px",
        color: "#919191",
        ...style,
      }}
    >
      <div style={{ paddingLeft: "25px", paddingRight: "25px" }}>
        <h5 style={{ fontWeight: "500", marginTop: "20px", color: "#4C4C4C" }}>
          Personal Information
        </h5>

        <div
          style={{
            paddingTop: "15px",
            paddingBottom: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Row: Phone Number */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ width: "150px" }}>Phone number</p>
              <p style={{ color: "#4C4C4C" }}>{phoneNumber}</p>
            </div>
            <div style={{ color: "#9CA3AF", fontSize: "18px" }}>{">"}</div>
          </div>

          {/* Row: Email */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ width: "150px" }}>Email</p>
              <p style={{ color: "#4C4C4C" }}>{email}</p>
            </div>
            <div style={{ color: "#9CA3AF", fontSize: "18px" }}>{">"}</div>
          </div>

          {/* Row: Contact Preference */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ width: "150px" }}>Contact preference</p>
              <p style={{ color: "#4C4C4C" }}>{contactPref}</p>
            </div>
            <div style={{ color: "#9CA3AF", fontSize: "18px" }}>{">"}</div>
          </div>

          {/* Row: Address */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ width: "150px" }}>Address</p>
              <p style={{ color: "#4C4C4C" }}>{address}</p>
            </div>
            <div style={{ color: "#9CA3AF", fontSize: "18px" }}>{">"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
