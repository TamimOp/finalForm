"use client";
import { useState } from "react";
import TemplatesTab from "../components/TemplatesTab";
import FilledFormsTab from "../components/TemplatesTab";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    router.push("/login");
  };
  const [activeTab, setActiveTab] = useState("templates");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="tabs">
        <button
          className={`tab ${activeTab === "templates" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("templates")}
        >
          Templates
        </button>
        <button
          className={`tab ${activeTab === "forms" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("forms")}
        >
          Filled Forms
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>

      <div className="mt-8">
        {activeTab === "templates" ? <TemplatesTab /> : <FilledFormsTab />}
      </div>
    </div>
  );
};

export default Dashboard;
