"use client";
import RecentForm from "@/components/RecentForm";
import TemplatesGallery from "@/components/TemplatesGallery";

const Dashboard = () => {
  return (
    <>
      <TemplatesGallery />
      <div className="container mx-auto px-4 py-8">
        <RecentForm />
      </div>
    </>
  );
};

export default Dashboard;
