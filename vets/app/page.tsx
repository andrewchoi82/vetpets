import Image from "next/image";
import { Header } from "@/components/Header";
import { SideBarContainer } from "@/components/SideBarContainer";
import { MainContent } from "@/components/MainContent";


export default function Home() {
  return (

    <div>
      {/* Header */}
      <Header/>

      {/* Side Bar */}
      <SideBarContainer/>

      {/* Main Page */}
      <MainContent/>

    </div>
  );
}
