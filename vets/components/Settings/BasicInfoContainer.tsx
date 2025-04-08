"use client";
import Image from "next/image";
import React from "react";

type SidebarProps = {
  style?: React.CSSProperties;
  profileImg: string;
  fullName: string;
  birthday: string;
  gender: string;
};

export default function BasicInfoContainer({
  style,
  profileImg,
  fullName,
  birthday,
  gender,
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
          Basic Information
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
          {/* Row: Profile Picture */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ width: "150px" }}>Profile picture</p>
              <Image
                src={profileImg}
                alt="Profile"
                width={30}
                height={30}
                style={{
                  objectFit: "cover",
                  borderRadius: "50%",
                  overflow: "hidden",
                  aspectRatio: "1/1",
                }}
              />
            </div>
            <div style={{ color: "#9CA3AF", fontSize: "18px" }}>{">"}</div>
          </div>

          {/* Row: Full Name */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ width: "150px" }}>Full name</p>
              <p style={{ color: "#4C4C4C" }}>{fullName}</p>
            </div>
            <div style={{ color: "#9CA3AF", fontSize: "18px" }}>{">"}</div>
          </div>

          {/* Row: Birthday */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ width: "150px" }}>Birthday</p>
              <p style={{ color: "#4C4C4C" }}>{birthday}</p>
            </div>
            <div style={{ color: "#9CA3AF", fontSize: "18px" }}>{">"}</div>
          </div>

          {/* Row: Gender */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ width: "150px" }}>Gender</p>
              <p style={{ color: "#4C4C4C" }}>{gender}</p>
            </div>
            <div style={{ color: "#9CA3AF", fontSize: "18px" }}>{">"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
