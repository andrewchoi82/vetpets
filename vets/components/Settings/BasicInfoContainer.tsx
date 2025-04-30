"use client";
import Image from "next/image";
import React, { useState } from "react";
import { capitalizeWords, formatSex, formatDate } from "@/app/utils/formatters";

type InputField = "firstName" | "lastName" | "birthday" | "sex";

type SidebarProps = {
  style?: React.CSSProperties;
  profileImg: string;
  fullName: string;
  birthday: string;
  sex: string;
  onUpdate?: (field: string, value: string) => void;
};

export default function BasicInfoContainer({
  style,
  profileImg,
  fullName,
  birthday,
  sex,
  onUpdate,
}: SidebarProps) {
  const [editMode, setEditMode] = useState<"fullName" | InputField | "profilePic" | null>(null);
  const [hoveredField, setHoveredField] = useState<null | string>(null);
  const [firstName, lastName] = fullName.split(" ");
  const [inputValues, setInputValues] = useState({
    firstName: firstName || "",
    lastName: lastName || "",
    birthday: birthday,
    sex: sex,
  });

  const formattedName = capitalizeWords(fullName);
  const formattedSex = formatSex(sex);
  const formattedBirthday = formatDate(birthday);

  const handleEdit = (field: "fullName" | InputField | "profilePic") => setEditMode(field);

  const handleChange = (field: InputField, value: string) =>
    setInputValues((prev) => ({ ...prev, [field]: value }));

  const handleSave = (field: string) => {
    if (field === "fullName") {
      const newFullName = `${inputValues.firstName} ${inputValues.lastName}`;
      onUpdate && onUpdate("fullName", newFullName);
    } else {
      onUpdate && onUpdate(field, inputValues[field as InputField]);
    }
    setEditMode(null);
  };

  const handleCancel = () => {
    setInputValues({
      firstName: firstName || "",
      lastName: lastName || "",
      birthday: birthday,
      sex: sex,
    });
    setEditMode(null);
  };

  // Fixed hover style to maintain original spacing
  const getHoverStyle = (field: string): React.CSSProperties => ({
    backgroundColor: hoveredField === field ? "#f9fafb" : "transparent",
    transition: "background-color 0.2s ease",
    marginLeft: "-25px", // Negative margin to offset parent padding
    paddingLeft: "25px", // Add padding back on the left
    paddingRight: "25px", // Add padding on the right
    width: "calc(100% + 50px)", // Add 50px to account for both left and right padding
    marginTop: "-10px",
    marginBottom: "-10px",
    paddingTop: "10px",
    paddingBottom: "10px",
  });

  const ArrowButton = ({ onClick }: { onClick: () => void }) => (
    <button
      onClick={onClick}
      style={{
        border: "none",
        background: "none",
        padding: 0,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "10.087px",
        height: "15.63px",
        flexShrink: 0,
      }}
    >
      <img
        src="/img/settings/arrow.svg"
        alt="Edit"
        style={{
          width: "10.087px",
          height: "15.63px",
          flexShrink: 0,
        }}
      />
    </button>
  );  

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
          {/* Profile Picture */}
          <div
            style={{
              ...getHoverStyle("profilePic"),
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "17px",
            }}
            onMouseEnter={() => setHoveredField("profilePic")}
            onMouseLeave={() => setHoveredField(null)}
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
            <ArrowButton onClick={() => handleEdit("profilePic")} />
          </div>

          {/* Full Name */}
          <div
            style={{
              ...getHoverStyle("fullName"),
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onMouseEnter={() => setHoveredField("fullName")}
            onMouseLeave={() => setHoveredField(null)}
          >
            {editMode === "fullName" ? (
              <div style={{ display: "flex", width: "100%", alignItems: "center", gap: "10px" }}>
                <p style={{ width: "150px" }}>Full name</p>
                <div style={{ display: "flex", flex: 1, gap: "10px" }}>
                  <input
                    type="text"
                    value={inputValues.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    placeholder="First Name"
                    style={{
                      flex: 1,
                      padding: "8px",
                      border: "1px solid #DFDFDF",
                      borderRadius: "5px",
                      color: "#4C4C4C",
                    }}
                  />
                  <input
                    type="text"
                    value={inputValues.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    placeholder="Last Name"
                    style={{
                      flex: 1,
                      padding: "8px",
                      border: "1px solid #DFDFDF",
                      borderRadius: "5px",
                      color: "#4C4C4C",
                    }}
                  />
                  <button
                    onClick={() => handleSave("fullName")}
                    style={{
                      padding: "8px 12px",
                      backgroundColor: "#0ea5e9",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    style={{
                      padding: "8px 12px",
                      backgroundColor: "#ef4444",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p style={{ width: "150px" }}>Full name</p>
                  <p style={{ color: "#4C4C4C" }}>{formattedName}</p>
                </div>
                <ArrowButton onClick={() => handleEdit("fullName")} />
              </>
            )}
          </div>

          {/* Birthday */}
          <div
            style={{
              ...getHoverStyle("birthday"),
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onMouseEnter={() => setHoveredField("birthday")}
            onMouseLeave={() => setHoveredField(null)}
          >
            {editMode === "birthday" ? (
              <div style={{ display: "flex", width: "100%", alignItems: "center", gap: "10px" }}>
                <p style={{ width: "150px" }}>Birthday</p>
                <div style={{ display: "flex", flex: 1, gap: "10px" }}>
                  <input
                    type="date"
                    value={inputValues.birthday}
                    onChange={(e) => handleChange("birthday", e.target.value)}
                    style={{
                      flex: 1,
                      padding: "8px",
                      border: "1px solid #DFDFDF",
                      borderRadius: "5px",
                      color: "#4C4C4C",
                    }}
                  />
                  <button
                    onClick={() => handleSave("birthday")}
                    style={{
                      padding: "8px 12px",
                      backgroundColor: "#0ea5e9",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    style={{
                      padding: "8px 12px",
                      backgroundColor: "#ef4444",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p style={{ width: "150px" }}>Birthday</p>
                  <p style={{ color: "#4C4C4C" }}>{formattedBirthday}</p>
                </div>

                <ArrowButton onClick={() => handleEdit("birthday")} />
              </>
            )}
          </div>

          {/* Sex */}
          <div
            style={{
              ...getHoverStyle("sex"),
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onMouseEnter={() => setHoveredField("sex")}
            onMouseLeave={() => setHoveredField(null)}
          >
            {editMode === "sex" ? (
              <div style={{ display: "flex", width: "100%", alignItems: "center", gap: "10px" }}>
                <p style={{ width: "150px" }}>Sex</p>
                <div style={{ display: "flex", flex: 1, gap: "10px" }}>
                  <select
                    value={inputValues.sex}
                    onChange={(e) => handleChange("sex", e.target.value)}
                    style={{
                      flex: 1,
                      padding: "8px",
                      border: "1px solid #DFDFDF",
                      borderRadius: "5px",
                      color: "#4C4C4C",
                    }}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                  <button
                    onClick={() => handleSave("sex")}
                    style={{
                      padding: "8px 12px",
                      backgroundColor: "#0ea5e9",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    style={{
                      padding: "8px 12px",
                      backgroundColor: "#ef4444",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p style={{ width: "150px" }}>Sex</p>
                  <p style={{ color: "#4C4C4C" }}>{formattedSex}</p>
                </div>
                <ArrowButton onClick={() => handleEdit("sex")} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}