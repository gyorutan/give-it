import { WorldOutline } from "@/components/icons/word-outline";
import { PackageSearch, PencilLine, TableProperties } from "lucide-react";
import Link from "next/link";
import React from "react";
import Greeting from "./_components/greeting";

const HomePage = () => {
  return (
    <div className="h-full bg-zinc-900 px-4 flex flex-col">
      <Greeting />
      <Link
        href={"/stuff"}
        className="flex items-center gap-2 border mb-4 border-zinc-700 p-4 rounded-xl transition hover:bg-zinc-800"
      >
        <PackageSearch size={24} />
        <span>친구들 물건 보러가기</span>
      </Link>
      <Link
        href={"/stuff/create"}
        className="flex items-center gap-2 border mb-4 border-zinc-700 p-4 rounded-xl transition hover:bg-zinc-800"
      >
        <PencilLine size={24} />
        <span>안쓰는 물건 내놓기</span>
      </Link>
      <Link
        target="blank"
        href={"https://acsu.shinshu-u.ac.jp"}
        className="flex items-center gap-2 border border-zinc-700 p-4 rounded-xl transition hover:bg-zinc-800"
      >
        <WorldOutline className="w-6 h-6" />
        <span>ACSU</span>
      </Link>
    </div>
  );
};

export default HomePage;
