"use client";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";
import UnfoldMoreSharpIcon from "@mui/icons-material/UnfoldMoreSharp";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import TemplateCreationTab from "./TemplateCreationTab";

const TemplatesGallery = () => {
  const router = useRouter();

  const handleBlankFormClick = () => {
    router.push("/dashboard/create-template");
  };

  return (
    <div className="bg-gray-100 py-4 lg:py-16">
      <div className="max-w-[1104px] mx-auto">
        <div className="flex flex-wrap justify-between items-center">
          <div className="text-lg text-gray-800 ">Templates</div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center text-base text-gray-700">
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
          <Button variant="outlined">
            <TemplateCreationTab />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplatesGallery;
