"use client";
import React from "react";
import Image from "next/image";
import { SelectTab } from "../Util/SelectTab";

interface RecordsHeaderProps {
  selectedTab: "vaccinations" | "test results" | "medications" | "medical history";
  setSelectedTabAction: (tab: "vaccinations" | "test results" | "medications" | "medical history") => void;
  tabChange: boolean;
  setTabChange: (change: boolean) => void;
}

interface TabItem {
  label: string;
  value: "vaccinations" | "test results" | "medications" | "medical history";
  iconBasePath: string;
  width: number;
  height: number;
}

export default function RecordsHeader({ selectedTab, setSelectedTabAction, tabChange, setTabChange }: RecordsHeaderProps) {
  const tabs: TabItem[] = [
    {
      label: "Vaccinations",
      value: "vaccinations",
      iconBasePath: "/img/health-records",
      width: 19,
      height: 19
    },
    {
      label: "Test results",
      value: "test results",
      iconBasePath: "/img/health-records",
      width: 25,
      height: 18.75
    },
    {
      label: "Medications",
      value: "medications",
      iconBasePath: "/img/health-records",
      width: 24,
      height: 19
    },
    {
      label: "Medical history",
      value: "medical history",
      iconBasePath: "/img/health-records",
      width: 14,
      height: 19
    }
  ];

  const getIconPath = (tab: TabItem, isSelected: boolean) => {
    const folder = isSelected ? "selected" : "nonSelected";
    const fileName = `${tab.value.replace(/\s+/g, "-")}-icon.svg`;
    return `${tab.iconBasePath}/${folder}/${fileName}`;
  };

  // Transform tabs to match SelectTab's expected format
  const selectTabItems = tabs.map((tab) => ({
    label: tab.label,
    value: tab.value,
    icon: (
      <Image
        src={getIconPath(tab, selectedTab === tab.value)}
        alt={tab.label}
        width={tab.width}
        height={tab.height}
      />
    )
  }));

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      padding: "0 24px",
      borderBottom: "1px solid #e5e7eb"
    }}>
      <div style={{ display: "flex", flexDirection: "column", width: "100%", marginTop: 20, marginBottom: 20}}>
        {/* Title and paw icon */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "15px", marginTop: "0px" }}>
          <div style={{ fontSize: 25, fontWeight: 500 }}>Health Records</div>
          <Image
            src="/img/paw.svg"
            alt="Paw Icon"
            width={20}
            height={20}
            style={{ marginLeft: 9 }}
          />
        </div>

        {/* Now use your SelectTab component */}
        <div style={{ marginTop: 8 }}>
          <SelectTab
            tabs={selectTabItems}
            selectedTab={selectedTab}
            onSelectTab={(tabValue) => {
              setSelectedTabAction(tabValue as "vaccinations" | "test results" | "medications" | "medical history");
              setTabChange(!tabChange);
              
            }}
          />
        </div>
      </div>
    </div>
  );
}
