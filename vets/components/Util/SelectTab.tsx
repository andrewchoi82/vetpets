"use client";

import React from "react";

interface TabItem {
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface SelectTabProps {
  tabs: TabItem[];
  selectedTab: string | null;
  onSelectTab: (value: string) => void;
}

export const SelectTab = ({ tabs, selectedTab, onSelectTab }: SelectTabProps) => {
  return (
    <div style={{ display: "flex", gap: "16px" }}> {/* 16px between buttons */}
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onSelectTab(tab.value)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0px 18px",
            height: "33px",
            gap: "10px",
            borderRadius: "100px",
            // When selectedTab is null, ensure all tabs show as non-selected
            background: selectedTab === tab.value ? "#004F82" : "#FFFFFF",
            color: selectedTab === tab.value ? "#FFFFFF" : "#4B5563",
            border: `1px solid ${selectedTab === tab.value ? "#004F82" : "#D1D5DB"}`,
            boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.03)",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            transition: "background-color 0.2s, color 0.2s, border-color 0.2s"
          }}
        >
          <div style={{ width: "15px", height: "15px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {tab.icon}
          </div>
          {tab.label}
        </button>
      ))}
    </div>
  );
};