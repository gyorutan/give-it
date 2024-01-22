import React from "react";
import FootbarItem from "./footbar-item";
import { Menu } from "./icons/menu";
import { HomeOutline } from "./icons/home-outline";
import { Pencil } from "./icons/pencil";
import { AddOutline } from "./icons/add-outline";

const Footbar = () => {
  const items = [
    {
      label: "홈",
      icon: <HomeOutline className="h-5 w-5 mt-1" />,
      href: "/",
    },
    {
      label: "글쓰기",
      icon: <AddOutline className="h-5 w-5 mt-1" />,
      href: "/new",
    },
    {
      label: "홈",
      icon: <Menu />,
      href: "/",
    },
  ];
  return (
    <div className="bg-zinc-950 fixed bottom-0 border-t border-zinc-700 w-full max-w-[766px] h-[48px] flex justify-between items-center">
      {items.map((item) => (
        <FootbarItem label={item.label} icon={item.icon} href={item.href} />
      ))}
    </div>
  );
};

export default Footbar;
