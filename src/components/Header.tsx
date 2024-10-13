"use client";
import AppsIcon from "@mui/icons-material/Apps";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, Avatar, Menu, MenuItem } from "@mui/material";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter

export const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
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

  // Handle navigating to the login page
  const handleLoginClick = () => {
    setAnchorEl(null); // Close the menu
    router.push("/login"); // Navigate to the login page
  };

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setIsLoggedIn(false); // Update login state to false
    router.push("/login");
  };

  // Check login status when component mounts
  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    setIsLoggedIn(!!token); // Update login state based on token presence
  }, []);

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
            <MenuItem onClick={handleClose}>Settings</MenuItem>
            {/* Show Login or Logout based on login state */}
            {isLoggedIn ? (
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
