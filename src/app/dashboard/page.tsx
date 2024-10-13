"use client";
import RecentForm from "@/components/RecentForm";
import TemplatesTab from "@/components/TemplatesTab";

const Dashboard = () => {
  return (
    <>
      <TemplatesTab />
      <div className="container mx-auto px-4 py-8">
        <RecentForm />
      </div>
    </>
  );
};

export default Dashboard;
