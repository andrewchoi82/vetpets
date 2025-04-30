"use client";
import React, { useState } from "react";

type InputField = "username" | "password" | "confirmPassword";

type SidebarProps = {
  style?: React.CSSProperties;
  username: string;
  password: string;
  onUpdate?: (field: string, value: string) => void;
};

export default function AccountInfo({
  style,
  username,
  password,
  onUpdate,
}: SidebarProps) {
  const [editMode, setEditMode] = useState<"username" | "password" | null>(null);
  const [hoveredField, setHoveredField] = useState<string | null>(null);
  const [inputValues, setInputValues] = useState({
    username: username,
    password: "",
    confirmPassword: "",
  });

  const handleEdit = (field: "username" | "password") => setEditMode(field);

  const handleChange = (field: InputField, value: string) => {
    setInputValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (field: "username" | "password") => {
    if (field === "password") {
      if (inputValues.password !== inputValues.confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
      if (inputValues.password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
      }
    }

    onUpdate && onUpdate(field, inputValues[field]);
    setEditMode(null);
  };

  const handleCancel = () => {
    setInputValues({
      username: username,
      password: "",
      confirmPassword: "",
    });
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
          Account Information
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
          {/* Username */}
          <div
            style={{
              ...getHoverStyle("username"),
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "17px",
            }}
            onMouseEnter={() => setHoveredField("username")}
            onMouseLeave={() => setHoveredField(null)}
          >
            {editMode === "username" ? (
              <div style={{ display: "flex", width: "100%", alignItems: "center", gap: "10px" }}>
                <p style={{ width: "150px" }}>Username</p>
                <div style={{ display: "flex", flex: 1, gap: "10px" }}>
                  <input
                    type="text"
                    value={inputValues.username}
                    onChange={(e) => handleChange("username", e.target.value)}
                    placeholder="Username"
                    style={{
                      flex: 1,
                      padding: "8px",
                      border: "1px solid #DFDFDF",
                      borderRadius: "5px",
                      color: "#4C4C4C",
                    }}
                  />
                  <button onClick={() => handleSave("username")} style={buttonStyle("#0ea5e9")}>Save</button>
                  <button onClick={handleCancel} style={buttonStyle("#ef4444")}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p style={{ width: "150px" }}>Username</p>
                  <p style={{ color: "#4C4C4C" }}>{username}</p>
                </div>
                <ArrowButton onClick={() => handleEdit("username")} />
              </>
            )}
          </div>

          {/* Password */}
          <div
            style={{
              ...getHoverStyle("password"),
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onMouseEnter={() => setHoveredField("password")}
            onMouseLeave={() => setHoveredField(null)}
          >
            {editMode === "password" ? (
              <div style={{ display: "flex", width: "100%", alignItems: "center", gap: "10px" }}>
                <p style={{ width: "150px" }}>Password</p>
                <div style={{ display: "flex", flex: 1, flexDirection: "column", gap: "10px" }}>
                  <input
                    type="password"
                    value={inputValues.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    placeholder="New Password"
                    style={{
                      flex: 1,
                      padding: "8px",
                      border: "1px solid #DFDFDF",
                      borderRadius: "5px",
                      color: "#4C4C4C",
                    }}
                  />
                  <input
                    type="password"
                    value={inputValues.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    placeholder="Confirm New Password"
                    style={{
                      flex: 1,
                      padding: "8px",
                      border: "1px solid #DFDFDF",
                      borderRadius: "5px",
                      color: "#4C4C4C",
                    }}
                  />
                  <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                    <button onClick={() => handleSave("password")} style={buttonStyle("#0ea5e9")}>Save</button>
                    <button onClick={handleCancel} style={buttonStyle("#ef4444")}>Cancel</button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p style={{ width: "150px" }}>Password</p>
                  <p style={{ color: "#4C4C4C" }}>{password}</p>
                </div>
                <ArrowButton onClick={() => handleEdit("password")} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const buttonStyle = (bg: string) => ({
  padding: "8px 12px",
  backgroundColor: bg,
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
});
