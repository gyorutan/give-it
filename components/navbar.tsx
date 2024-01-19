"use client";

import React from "react";
import { Menu } from "./icons/menu";
import { User } from "./icons/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import toast from "react-hot-toast";

const Navbar = () => {
  const logout = () => {
    toast.success("로그아웃");
  };
  return (
    <div className="fixed top-0 mx-auto border-b border-zinc-700 w-full px-3 max-w-[767px] h-[45px] flex justify-between items-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <Menu className="h-6 w-6" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="text-white ml-2 mt-3 bg-zinc-700 border-zinc-600">
          <DropdownMenuItem
            asChild
            className="cursor-pointer focus:bg-zinc-600 focus:text-white"
          >
            <Link href={"/"}>홈</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className="cursor-pointer focus:bg-zinc-600 focus:text-white"
          >
            <Link href={"/"}>페이지1</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className="cursor-pointer focus:bg-zinc-600 focus:text-white"
          >
            <Link href={"/"}>페이지2</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className="cursor-pointer focus:bg-zinc-600 focus:text-white"
          >
            <Link href={"/"}>페이지3</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <span className="text-xl font-bold">Give it !</span>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <User className="h-6 w-6" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="text-white mr-2 mt-3 bg-zinc-700 border-zinc-600">
          <DropdownMenuItem
            asChild
            className="cursor-pointer focus:bg-zinc-600 focus:text-white"
          >
            <Link href={"/"}>프로필</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-zinc-600" />
          <DropdownMenuItem
            asChild
            className="cursor-pointer focus:bg-zinc-600 focus:text-red-500"
          >
            <div onClick={logout} className="text-red-500">
              로그아웃
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;
