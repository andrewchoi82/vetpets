import { Header } from "@/components/Header";
import { SideBarContainer } from "@/components/SideBar/SideBarContainer";
import MainContent from "@/components/MainContent";

export default function Home() {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <SideBarContainer selectedPage="Dashboard" />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff", overflowY: "auto" }}>
        <Header title="Dashboard" />
        <MainContent />
      </div>
    </div>
  );
}
