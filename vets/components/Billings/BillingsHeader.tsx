"use client";
import React from "react";
import Image from "next/image";
import { SelectTab } from "../Util/SelectTab";

interface BillingsHeaderProps {
  selectedTab: "current bills" | "payment history";
  setSelectedTabAction: (tab: "current bills" | "payment history") => void;
}

interface TabItem {
  label: string;
  value: "current bills" | "payment history";
  iconBasePath: string;
  fileName: string;
}

export default function RecordsHeader({ selectedTab, setSelectedTabAction }: BillingsHeaderProps) {
  const tabs: TabItem[] = [
    {
      label: "Current bills",
      value: "current bills",
      iconBasePath: "/img/billings",
      fileName: "current-bills-icon.svg"
    },
    {
      label: "Payment history",
      value: "payment history",
      iconBasePath: "/img/billings",
      fileName: "payment-history-icon.svg"
    }
  ];

  const getIconPath = (tab: TabItem, isSelected: boolean) => {
    const folder = isSelected ? "selected" : "nonSelected";
    return `${tab.iconBasePath}/${folder}/${tab.fileName}`;
  };

  const selectTabItems = tabs.map((tab) => ({
    label: tab.label,
    value: tab.value,
    icon: (
      <Image
        src={getIconPath(tab, selectedTab === tab.value)}
        alt={tab.label}
        width={16}
        height={16}
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
      <div style={{ display: "flex", flexDirection: "column", width: "100%", marginTop: 20, marginBottom: 20 }}>
        {/* Title and paw icon */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 500 }}>Billings</div>
          <Image
            src="/img/paw.svg"
            alt="Paw Icon"
            width={20}
            height={20}
            style={{ marginLeft: 9 }}
          />
        </div>

        {/* Tabs */}
        <div style={{ marginTop: 8 }}>
          <SelectTab
            tabs={selectTabItems}
            selectedTab={selectedTab}
            onSelectTab={(tabValue) =>
              setSelectedTabAction(tabValue as "current bills" | "payment history")
            }
          />
        </div>
      </div>
    </div>
  );
}
