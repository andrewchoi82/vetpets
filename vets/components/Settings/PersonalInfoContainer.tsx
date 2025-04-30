"use client";
import React, { useState } from "react";
import { formatPhoneNumber, formatContactPreference, formatAddress } from "@/app/utils/formatters";

type SidebarProps = {
  style?: React.CSSProperties;
  phoneNumber: string;
  email: string;
  contactPref: string;
  address: string;
  onUpdate: (field: string, value: string) => Promise<void>;
};

interface InputValues {
  phoneNumber: string;
  email: string;
  contactPref: string;
  address: string;
  [key: string]: string;
}

export default function PersonalInfoContainer({
  style,
  phoneNumber,
  email,
  contactPref,
  address,
  onUpdate,
}: SidebarProps) {
  const [editMode, setEditMode] = useState<string | null>(null);
  const [hoveredField, setHoveredField] = useState<string | null>(null);
  const [inputValues, setInputValues] = useState<InputValues>({
    phoneNumber,
    email,
    contactPref,
    address,
  });

  const formattedPhone = formatPhoneNumber(phoneNumber);
  const formattedContactPref = formatContactPreference(contactPref);
  const formattedAddress = formatAddress(address);

  const handleEdit = (field: string) => setEditMode(field);

  const handleChange = (field: string, value: string) =>
    setInputValues((prev) => ({ ...prev, [field]: value }));

  const handleSave = async (field: string) => {
    await onUpdate(field, inputValues[field]);
    setEditMode(null);
  };

  const handleCancel = () => {
    setInputValues({ phoneNumber, email, contactPref, address });
    setEditMode(null);
  };

  const getHoverStyle = (field: string): React.CSSProperties => ({
    backgroundColor: hoveredField === field ? "#f9fafb" : "transparent",
    transition: "background-color 0.2s ease",
    marginLeft: "-25px",
    paddingLeft: "25px",
    paddingRight: "25px",
    width: "calc(100% + 50px)",
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
          Personal Information
        </h5>

        <div style={{ paddingTop: "15px", paddingBottom: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Phone Number */}
          <div
            style={{ ...getHoverStyle("phoneNumber"), display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "17px" }}
            onMouseEnter={() => setHoveredField("phoneNumber")}
            onMouseLeave={() => setHoveredField(null)}
          >
            {editMode === "phoneNumber" ? (
              <div style={{ display: "flex", width: "100%", alignItems: "center", gap: "10px" }}>
                <p style={{ width: "150px" }}>Phone number</p>
                <div style={{ display: "flex", flex: 1, gap: "10px" }}>
                  <input
                    type="tel"
                    value={inputValues.phoneNumber}
                    onChange={(e) => handleChange("phoneNumber", e.target.value)}
                    placeholder="Phone Number"
                    style={{ flex: 1, padding: "8px", border: "1px solid #DFDFDF", borderRadius: "5px", color: "#4C4C4C" }}
                  />
                  <button onClick={() => handleSave("phoneNumber")} style={buttonStyle("#0ea5e9")}>Save</button>
                  <button onClick={handleCancel} style={buttonStyle("#ef4444")}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p style={{ width: "150px" }}>Phone number</p>
                  <p style={{ color: "#4C4C4C" }}>{formattedPhone}</p>
                </div>
                <ArrowButton onClick={() => handleEdit("phoneNumber")} />
              </>
            )}
          </div>

          {/* Email */}
          <div
            style={{ ...getHoverStyle("email"), display: "flex", alignItems: "center", justifyContent: "space-between" }}
            onMouseEnter={() => setHoveredField("email")}
            onMouseLeave={() => setHoveredField(null)}
          >
            {editMode === "email" ? (
              <InputRow field="email" label="Email" value={inputValues.email} handleChange={handleChange} handleSave={handleSave} handleCancel={handleCancel} />
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p style={{ width: "150px" }}>Email</p>
                  <p style={{ color: "#4C4C4C" }}>{email}</p>
                </div>
                <ArrowButton onClick={() => handleEdit("email")} />
              </>
            )}
          </div>

          {/* Contact Preference */}
          <div
            style={{ ...getHoverStyle("contactPref"), display: "flex", alignItems: "center", justifyContent: "space-between" }}
            onMouseEnter={() => setHoveredField("contactPref")}
            onMouseLeave={() => setHoveredField(null)}
          >
            {editMode === "contactPref" ? (
              <SelectRow field="contactPref" label="Contact preference" value={inputValues.contactPref} handleChange={handleChange} handleSave={handleSave} handleCancel={handleCancel} options={["Phone Call", "Text Message", "Email", "No Preference"]} />
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p style={{ width: "150px" }}>Contact preference</p>
                  <p style={{ color: "#4C4C4C" }}>{formattedContactPref}</p>
                </div>
                <ArrowButton onClick={() => handleEdit("contactPref")} />
              </>
            )}
          </div>

          {/* Address */}
          <div
            style={{ ...getHoverStyle("address"), display: "flex", alignItems: "center", justifyContent: "space-between" }}
            onMouseEnter={() => setHoveredField("address")}
            onMouseLeave={() => setHoveredField(null)}
          >
            {editMode === "address" ? (
              <InputRow field="address" label="Address" value={inputValues.address} handleChange={handleChange} handleSave={handleSave} handleCancel={handleCancel} />
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p style={{ width: "150px" }}>Address</p>
                  <p style={{ color: "#4C4C4C" }}>{formattedAddress}</p>
                </div>
                <ArrowButton onClick={() => handleEdit("address")} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Common styles
const buttonStyle = (bg: string) => ({
  padding: "8px 12px",
  backgroundColor: bg,
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
});

const editIconStyle = {
  color: "#9CA3AF",
  fontSize: "18px",
  cursor: "pointer",
};

// Reusable input row
const InputRow = ({ field, label, value, handleChange, handleSave, handleCancel }: any) => (
  <div style={{ display: "flex", width: "100%", alignItems: "center", gap: "10px" }}>
    <p style={{ width: "150px" }}>{label}</p>
    <div style={{ display: "flex", flex: 1, gap: "10px" }}>
      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(field, e.target.value)}
        placeholder={label}
        style={{ flex: 1, padding: "8px", border: "1px solid #DFDFDF", borderRadius: "5px", color: "#4C4C4C" }}
      />
      <button onClick={() => handleSave(field)} style={buttonStyle("#0ea5e9")}>Save</button>
      <button onClick={handleCancel} style={buttonStyle("#ef4444")}>Cancel</button>
    </div>
  </div>
);

// Reusable select row
const SelectRow = ({ field, label, value, handleChange, handleSave, handleCancel, options }: any) => (
  <div style={{ display: "flex", width: "100%", alignItems: "center", gap: "10px" }}>
    <p style={{ width: "150px" }}>{label}</p>
    <div style={{ display: "flex", flex: 1, gap: "10px" }}>
      <select
        value={value}
        onChange={(e) => handleChange(field, e.target.value)}
        style={{ flex: 1, padding: "8px", border: "1px solid #DFDFDF", borderRadius: "5px", color: "#4C4C4C" }}
      >
        {options.map((opt: string) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <button onClick={() => handleSave(field)} style={buttonStyle("#0ea5e9")}>Save</button>
      <button onClick={handleCancel} style={buttonStyle("#ef4444")}>Cancel</button>
    </div>
  </div>
);
