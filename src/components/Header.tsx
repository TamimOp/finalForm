import AppsIcon from "@mui/icons-material/Apps";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import React from "react";
import Image from "next/image";

export const Header = () => {
  return (
    <>
      <div className="flex justify-between items-center h-16 bg-main p-4">
        <div className="flex items-center">
          <Image
            src="/images/formLogo.png"
            width={30}
            height={30}
            alt="no-image"
            className="h-10 w-10"
          />
          <div className="text-textColor text-lg pl-2">FinalForms</div>
        </div>

        <div className="flex items-center bg-gray-100 rounded-lg text-textColor w-[700px] h-[45px] mx-4">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <input
            type="text"
            placeholder="Search"
            className="border-none bg-transparent w-full outline-none"
            // onChange={(e) => e.target.value}
          />
        </div>

        <div className="flex items-center">
          <IconButton style={{ margin: "0px" }}>
            <AppsIcon style={{ fontSize: "22px" }} />
          </IconButton>
        </div>
      </div>
    </>
  );
};
