import { Header } from "@/components/MainHeader/Header";
import { SideBarContainerClient } from "@/components/MainSideBar/SideBarContainerClient";
import MainContent from "@/components/Dashboard/MainContent";

export default function Home() {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <SideBarContainerClient selectedPage="Dashboard" />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff", overflowY: "auto" }}>
        <Header title="Dashboard" showSearchBar={true}/>
        <MainContent />
      </div>
    </div>
  );
}
