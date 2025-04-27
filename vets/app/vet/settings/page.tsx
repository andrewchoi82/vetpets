import { getUserFromToken } from "@/app/lib/api/auth";
import { redirect } from "next/navigation";
import SettingsClient from "@/components/Settings/SettingsClient";
import SettingsVet from "@/components/Settings/SettingsVet";


export default async function SettingsPage() {
  const session = await getUserFromToken();

  if (!session) {
    redirect("/login"); // If not logged in, bounce to login
  }


  return <SettingsVet />;   
  
}
