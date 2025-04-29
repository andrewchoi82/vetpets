// "use client";

// import { SideBarItem } from "@/components/MainSideBar/SideBarItem";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// interface SideBarContainerProps {
//   selectedPage: string;
// }

// export const SideBarContainerVets = ({ selectedPage }: SideBarContainerProps) => {
//   const router = useRouter();

//   const menuItems = [
//     { path: "/img/vet/sidebar-options/nonSelectedVersion/clients.svg", text: "Clients", href: "/vet/" },
//     { path: "/img/vet/sidebar-options/nonSelectedVersion/messages.svg", text: "Messages", href: "/vet/messages", notificationCount: 2 },
//     { path: "/img/vet/sidebar-options/nonSelectedVersion/calendar.svg", text: "Calendar", href: "/vet/calendar" },

//     { path: "/img/vet/sidebar-options/nonSelectedVersion/health-records.svg", text: "Create Pet", href: "/vet/create-pet" },

//     { path: "/img/sidebar-options/nonSelectedVersion/settings.svg", text: "Settings", href: "/vet/settings" },
//   ];

//   const handleClick = (href: string) => {
//     if (window.location.pathname === href) {
//       window.location.reload();
//     } else {
//       router.push(href);
//     }
//   };

//   return (
//     <>
//       <div style={{ position: "fixed", top: "20px", left: "20px", zIndex: 110 }}>
//         <Image src="/img/vetrail-logo.svg" alt="Vetrail Logo" width={30} height={30} />
//       </div>
//       <aside
//         style={{
//           width: "80px",
//           minHeight: "calc(100vh - 40px)",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "flex-start",
//           padding: "24px 0px",
//           backgroundColor: "#F9FAFB",
//           borderRadius: "40px",
//           margin: "20px 0 20px 20px",
//           boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.5), 0 0 0 1px rgba(0, 0, 0, 0.04)",
//           position: "fixed",
//           left: 0,
//           top: 0,
//           zIndex: 100,
//         }}
//       >
//         <div>
//           {/* Menu Items */}
//           <div style={{ marginTop: "60px" }}>
//             {menuItems.map((item) => (
//               <SideBarItem
//                 key={item.text}
//                 path={item.path}
//                 text={item.text}
//                 isSelected={selectedPage === item.text}
//                 onClick={() => handleClick(item.href)}
//                 notificationCount={item.notificationCount || 0}
//                 iconsOnly={true}
//               />
//             ))}
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// };
