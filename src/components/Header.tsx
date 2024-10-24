"use client";
import { useUserStore } from "@/store/user-store";
import AppsIcon from "@mui/icons-material/Apps";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter
import React, { useState } from "react";

export const Header = () => {
  const user = useUserStore((state: any) => state.user);
  const setUser = useUserStore((state: any) => state.setUser);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  // Handle opening the menu
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing the menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSettings = () => {
    setAnchorEl(null);
    router.push("/dashboard/admin-panel");
  };

  // Handle navigating to the login page
  const handleLoginClick = () => {
    setAnchorEl(null); // Close the menu
    router.push("/login"); // Navigate to the login page
  };

  // Handle logout functionality
  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setUser(undefined);
    router.push("/login");
  };

  console.log(user);

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
          />
        </div>

        <div className="flex items-center">
          <IconButton style={{ margin: "0px" }}>
            <AppsIcon style={{ fontSize: "22px" }} />
          </IconButton>

          {/* Avatar that opens a menu when clicked */}
          <IconButton onClick={handleMenuClick}>
            <Avatar />
          </IconButton>

          {/* The dropdown menu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleSettings}>Settings</MenuItem>
            {/* Show Login or Logout based on login state */}
            {user ? (
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            ) : (
              <MenuItem onClick={handleLoginClick}>Login</MenuItem>
            )}
          </Menu>
        </div>
      </div>
    </>
  );
};
