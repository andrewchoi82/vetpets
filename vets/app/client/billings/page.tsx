"use client";

import { Header } from "@/components/MainHeader/Header";
import { SideBarContainerClient } from "@/components/MainSideBar/SideBarContainerClient";
import BillingsHeader from "@/components/Billings/BillingsHeader";
import BillingsTable from "@/components/Billings/BillingsTable";
import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/app/lib/supabaseClient";
import Cookies from "js-cookie";

export default function Billings() {
  const [selectedTab, setSelectedTab] = useState<"current bills" | "payment history">("current bills");
  const [allBillings, setAllBillings] = useState<{
    current_bills: any[];
    payment_history: any[];
  }>({
    current_bills: [],
    payment_history: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllBillingData();
  }, []); // Only fetch once when component mounts

  const fetchAllBillingData = async () => {
    setLoading(true);
    try {
      const petId = Cookies.get('petId');
      if (!petId) throw new Error('No pet ID found');

      // Get current date for filtering
      const today = new Date().toISOString().split('T')[0];

      // Fetch all billing data
      const { data, error } = await supabase
        .from('billings')
        .select('*')
        .eq('petId', petId)
        .order('date', { ascending: false });

      if (error) throw error;

      // Split into current and historical bills
      const current = data?.filter(bill => !bill.paid) || [];
      const history = data?.filter(bill => bill.paid) || [];

      setAllBillings({
        current_bills: current,
        payment_history: history
      });
    } catch (error) {
      console.error("Error fetching billing data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <SideBarContainerClient selectedPage="Billings" />
        <div style={{ 
          flex: 1, 
          position: "relative", 
          backgroundColor: "#fff", 
          marginLeft: "120px" 
        }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff",
            zIndex: 10
          }}>
            <Image
              src="/img/vetrail-logo.svg"
              alt="Loading..."
              width={80}
              height={80}
              style={{
                animation: "spin 1.5s linear infinite"
              }}
            />
          </div>

          <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  // Convert selected tab to the corresponding key in allBillings
  const selectedTabKey = selectedTab.replace(' ', '_') as keyof typeof allBillings;
  const currentBillings = allBillings[selectedTabKey];

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <SideBarContainerClient selectedPage="Billings" />

      <div style={{ 
        flex: 1, 
        display: "flex", 
        flexDirection: "column", 
        background: "#fff", 
        overflowY: "auto",
        marginLeft: "120px"
      }}>
        <Header title="" showSearchBar={true} />
        <BillingsHeader 
          selectedTab={selectedTab} 
          setSelectedTabAction={setSelectedTab} 
        />
        {currentBillings.length === 0 ? (
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center", 
            padding: "40px",
            color: "#4C4C4C",
            fontStyle: "italic"
          }}>
            {selectedTab === "current bills" 
              ? "You have no current bills."
              : "You have no payment history."}
          </div>
        ) : (
          <BillingsTable 
            selectedTab={selectedTab} 
            setSelectedTabAction={setSelectedTab}
            billings={currentBillings}
          />
        )}
      </div>
    </div>
  );
}
