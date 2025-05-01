import { Header } from "@/components/MainHeader/Header";
import { SideBarContainerClient } from "@/components/MainSideBar/SideBarContainerClient";
import MainContentNew from "@/components/Dashboard/MainContentNew";

export default function Home() {
  return (
    <div style={{ display: "flex", backgroundColor: "#F9F9F9", height: "100vh", overflow: "hidden" }}>
      <SideBarContainerClient selectedPage="Dashboard" />

      <div style={{ 
        flex: 1, 
        display: "flex", 
        flexDirection: "column", 
        background: "#fff", 
        overflowY: "auto",
        marginLeft: "120px" // Add margin to avoid overlap with the sidebar
      }}>
        <MainContentNew />
      </div>
    </div>
  );
}
