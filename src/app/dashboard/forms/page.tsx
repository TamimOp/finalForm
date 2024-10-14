"use client";
import React from "react";
import { useEffect, useState } from "react";

type Template = {
  id: number;
  title: string;
  description: string;
};

function Forms() {
  const [templates, setTemplates] = useState<Template[]>([]);
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await fetch("/api/templates");
        const data: Template[] = await res.json();
        setTemplates(data);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };
    fetchTemplates();
  }, []);
  return (
    <div className="m-8">
      {templates.length > 0 ? (
        templates.map((template) => (
          <div key={template.id} className="mr-6 mt-4 cursor-pointer">
            <a href={`/dashboard/template/${template.id}`} className="block">
              <div className="h-[120px] w-[171px] rounded border border-white hover:border-purple-700 bg-white flex items-center justify-center">
                <p className="text-center text-gray-700">{template.title}</p>
              </div>
              <p className="mt-2 text-sm font-medium text-gray-800">
                {template.description}
              </p>
            </a>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No templates found.</p>
      )}
    </div>
  );
}

export default Forms;
