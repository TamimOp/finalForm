"use client";
import { useEffect, useState } from "react";
import UnfoldMoreSharpIcon from "@mui/icons-material/UnfoldMoreSharp";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

type Template = {
  id: number;
  title: string;
  description: string;
};

const TemplatesTab = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const router = useRouter();

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
  const handleBlankFormClick = () => {
    router.push("/dashboard/create-template");
  };
  return (
    <div className="bg-gray-100 py-4 lg:py-16">
      <div className="max-w-[1104px] mx-auto">
        <div className="flex flex-wrap justify-between items-center">
          <div className="text-base text-gray-800">My Templates</div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center text-sm text-gray-700">
              Template gallery
              <UnfoldMoreSharpIcon fontSize="small" />
            </button>
            <IconButton>
              <MoreVertSharpIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
        <div className="flex flex-wrap justify-start mt-4 gap-5">
          <Button variant="outlined" onClick={handleBlankFormClick}>
            <div className="flex flex-col gap-11 py-10 px-5">
              <p>Blank Form</p>
              <p>𒀱</p>
            </div>
          </Button>
          {templates.length > 0 ? (
            templates.map((template) => (
              <div key={template.id} className="mr-6 mt-4 cursor-pointer">
                <a
                  href={`/dashboard/template/${template.id}`}
                  className="block"
                >
                  <div className="h-[120px] w-[171px] rounded border border-white hover:border-purple-700 bg-white flex items-center justify-center">
                    <p className="text-center text-gray-700">
                      {template.title}
                    </p>
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
      </div>
    </div>
  );
};

export default TemplatesTab;
