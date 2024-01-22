import Link from "next/link";
import React, { ReactElement } from "react";

interface ItemProps {
  label: string;
  icon: ReactElement;
  href: string;
}

const FootbarItem = ({ label, icon, href }: ItemProps) => {
  return (
    <div className="flex items-center w-full h-[48px]">
      <Link href={href} className="flex flex-col items-center w-full h-[48px] hover:bg-zinc-900 transition">
        {icon}
        <span className="text-sm">{label}</span>
      </Link>
    </div>
  );
};

export default FootbarItem;
