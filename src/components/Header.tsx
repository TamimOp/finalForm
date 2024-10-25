"use client";
import { useUserStore } from "@/store/user-store";
import AppsIcon from "@mui/icons-material/Apps";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter
import React, { useState } from "react";
import Link from "next/link";

export const Header = () => {
  const user = useUserStore((state: any) => state.user);
  const setUser = useUserStore((state: any) => state.setUser);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSettings = () => {
    setAnchorEl(null);
    router.push("/dashboard/admin-panel");
  };

  const handleLoginClick = () => {
    setAnchorEl(null);
    router.push("/login");
  };

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
          <Link href="/dashboard">
            <Image
              src="/images/formLogo.png"
              width={30}
              height={30}
              alt="Logo"
              className="h-10 w-10 cursor-pointer"
            />
          </Link>
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

          <IconButton onClick={handleMenuClick}>
            <Avatar />
          </IconButton>

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
