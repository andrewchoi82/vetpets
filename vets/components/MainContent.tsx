import DashboardRecentTestBox from "@/components/DashboardComponents/dashboardRecentTestBox";
import DashboardBillingBox from "@/components/DashboardComponents/dashboardBillingBox";
import DashboardMessagesBox from "@/components/DashboardComponents/dashboardMessagesBox";
import DashboardAppointmentsBox from "@/components/DashboardComponents/dashboardAppointmentsBox";
import DashboardSmallBox from "@/components/DashboardComponents/dashboardSmallBox";

export default function MainContent() {
  return (
    <main style={{ padding: "30px" }}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <DashboardSmallBox label="Breed" value="Husky" image="/img/dashboard/dashboardBreed.svg" />
        <DashboardSmallBox label="Age" value="4 mo" image="/img/dashboard/dashboardAge.svg" />
        <DashboardSmallBox label="Weight" value="32 lb" image="/img/dashboard/dashboardWeight.svg" />
        <DashboardSmallBox label="Gender" value="Male" image="/img/dashboard/gender-icon.svg" />
        <DashboardSmallBox label="Sterilized" value="Yes" image="/img/dashboard/sterilized-icon.svg" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <DashboardAppointmentsBox />
        <DashboardMessagesBox />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <DashboardBillingBox />
        <DashboardRecentTestBox />
      </div>
    </main>
  );
}
