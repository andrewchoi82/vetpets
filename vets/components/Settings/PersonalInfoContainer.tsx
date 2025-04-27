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

// Define an interface with an index signature for the input values
interface InputValues {
  phoneNumber: string;
  email: string;
  contactPref: string;
  address: string;
  [key: string]: string; // Add index signature to allow string indexing
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
  const [inputValues, setInputValues] = useState<InputValues>({
    phoneNumber: phoneNumber,
    email: email,
    contactPref: contactPref,
    address: address,
  });

  // Format the display values
  const formattedPhone = formatPhoneNumber(phoneNumber);
  const formattedContactPref = formatContactPreference(contactPref);
  const formattedAddress = formatAddress(address);

  const handleEdit = (field: string) => {
    setEditMode(field);
  };

  const handleChange = (field: string, value: string) => {
    setInputValues(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async (field: string) => {
    await onUpdate(field, inputValues[field]);
    setEditMode(null);
  };

  const handleCancel = () => {
    // Reset the input values to the original values
    setInputValues({
      phoneNumber: phoneNumber,
      email: email,
      contactPref: contactPref,
      address: address,
    });
    setEditMode(null);
  };

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
              fontSize: "17px"
            }}
          >
            {editMode === 'phoneNumber' ? (
              <div style={{ display: "flex", width: "100%", alignItems: "center", gap: "10px" }}>
                <p style={{ width: "150px" }}>Phone number</p>
                <div style={{ display: "flex", flex: 1, gap: "10px" }}>
                  <input
                    type="tel"
                    value={inputValues.phoneNumber}
                    onChange={(e) => handleChange('phoneNumber', e.target.value)}
                    placeholder="Phone Number"
                    style={{
                      flex: 1,
                      padding: "8px",
                      border: "1px solid #DFDFDF",
                      borderRadius: "5px",
                      color: "#4C4C4C"
                    }}
                  />
                  <button 
                    onClick={() => handleSave('phoneNumber')}
                    style={{
                      padding: "8px 12px",
                      backgroundColor: "#0ea5e9",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer"
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
                      cursor: "pointer"
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p style={{ width: "150px" }}>Phone number</p>
                  <p style={{ color: "#4C4C4C" }}>{formattedPhone}</p>
                </div>
                <div 
                  style={{ color: "#9CA3AF", fontSize: "18px", cursor: "pointer" }}
                  onClick={() => handleEdit('phoneNumber')}
                >
                  {">"}
                </div>
              </>
            )}
          </div>

          {/* Row: Email */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {editMode === 'email' ? (
              <div style={{ display: "flex", width: "100%", alignItems: "center", gap: "10px" }}>
                <p style={{ width: "150px" }}>Email</p>
                <div style={{ display: "flex", flex: 1, gap: "10px" }}>
                  <input
                    type="email"
                    value={inputValues.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="Email"
                    style={{
                      flex: 1,
                      padding: "8px",
                      border: "1px solid #DFDFDF",
                      borderRadius: "5px",
                      color: "#4C4C4C"
                    }}
                  />
                  <button 
                    onClick={() => handleSave('email')}
                    style={{
                      padding: "8px 12px",
                      backgroundColor: "#0ea5e9",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer"
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
                      cursor: "pointer"
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p style={{ width: "150px" }}>Email</p>
                  <p style={{ color: "#4C4C4C" }}>{email}</p>
                </div>
                <div 
                  style={{ color: "#9CA3AF", fontSize: "18px", cursor: "pointer" }}
                  onClick={() => handleEdit('email')}
                >
                  {">"}
                </div>
              </>
            )}
          </div>

          {/* Row: Contact Preference */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {editMode === 'contactPref' ? (
              <div style={{ display: "flex", width: "100%", alignItems: "center", gap: "10px" }}>
                <p style={{ width: "150px" }}>Contact preference</p>
                <div style={{ display: "flex", flex: 1, gap: "10px" }}>
                  <select
                    value={inputValues.contactPref}
                    onChange={(e) => handleChange('contactPref', e.target.value)}
                    style={{
                      flex: 1,
                      padding: "8px",
                      border: "1px solid #DFDFDF",
                      borderRadius: "5px",
                      color: "#4C4C4C"
                    }}
                  >
                    <option value="Phone Call">Phone Call</option>
                    <option value="Text Message">Text Message</option>
                    <option value="Email">Email</option>
                    <option value="No Preference">No Preference</option>
                  </select>
                  <button 
                    onClick={() => handleSave('contactPref')}
                    style={{
                      padding: "8px 12px",
                      backgroundColor: "#0ea5e9",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer"
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
                      cursor: "pointer"
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p style={{ width: "150px" }}>Contact preference</p>
                  <p style={{ color: "#4C4C4C" }}>{formattedContactPref}</p>
                </div>
                <div 
                  style={{ color: "#9CA3AF", fontSize: "18px", cursor: "pointer" }}
                  onClick={() => handleEdit('contactPref')}
                >
                  {">"}
                </div>
              </>
            )}
          </div>

          {/* Row: Address */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {editMode === 'address' ? (
              <div style={{ display: "flex", width: "100%", alignItems: "center", gap: "10px" }}>
                <p style={{ width: "150px" }}>Address</p>
                <div style={{ display: "flex", flex: 1, gap: "10px" }}>
                  <input
                    type="text"
                    value={inputValues.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    placeholder="Address"
                    style={{
                      flex: 1,
                      padding: "8px",
                      border: "1px solid #DFDFDF",
                      borderRadius: "5px",
                      color: "#4C4C4C"
                    }}
                  />
                  <button 
                    onClick={() => handleSave('address')}
                    style={{
                      padding: "8px 12px",
                      backgroundColor: "#0ea5e9",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer"
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
                      cursor: "pointer"
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p style={{ width: "150px" }}>Address</p>
                  <p style={{ color: "#4C4C4C" }}>{formattedAddress}</p>
                </div>
                <div 
                  style={{ color: "#9CA3AF", fontSize: "18px", cursor: "pointer" }}
                  onClick={() => handleEdit('address')}
                >
                  {">"}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}