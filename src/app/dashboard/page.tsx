"use client";
import RecentForm from "@/components/RecentForm";
import TemplatesGallery from "@/components/TemplatesGallery";
import AuthOnly from "@/providers/AuthOnly";

const Dashboard = () => {
  return (
    <AuthOnly>
      <TemplatesGallery />
      <div className="container mx-auto px-4 py-8">
        <RecentForm />
      </div>
    </AuthOnly>
  );
};

export default Dashboard;
