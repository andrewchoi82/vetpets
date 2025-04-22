"use client";
import Image from "next/image";
import React from "react";

type SidebarProps = {
  style?: React.CSSProperties;
  username: string;
  password: string
};

export default function AccountInfo({
  style,
  username,
  password
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
        <h5 style={{ fontSize: "20px", fontWeight: "500", marginTop: "20px", color: "#4C4C4C" }}>
          Account information
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
          {/* Row: Username */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "17px"
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ width: "150px" }}>Username</p>
              <p style={{ color: "#4C4C4C" }}>{username}</p>
            </div>
            <div style={{ color: "#9CA3AF", fontSize: "18px" }}>{">"}</div>
          </div>

          {/* Row: Password */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ width: "150px" }}>Password</p>
              <p style={{ color: "#4C4C4C" }}>{password}</p>
            </div>
            <div style={{ color: "#9CA3AF", fontSize: "18px" }}>{">"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
