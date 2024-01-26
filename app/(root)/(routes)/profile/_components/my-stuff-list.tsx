"use client";

import { api } from "@/lib/api";
import axios from "axios";
import React, { useEffect, useState } from "react";
import StuffItem from "../../stuff/_components/stuff-item";
import Link from "next/link";

interface Stuff {
  id: string;
  title: string;
  content: string;
  userId: string;
  imageUrl: string;
  createdAt: Date;
}

const MyStuffList = () => {
  const [stuffs, setStuffs] = useState<Stuff[]>([]);
  const fetchMyStuff = async () => {
    const data = await axios
      .get(`${api}/posts/myposts`, {
        withCredentials: true,
      })
      .then((res) => res.data);
    setStuffs(data.myPosts);
  };
  useEffect(() => {
    fetchMyStuff();
  }, []);

  return (
    <div>
      {stuffs.map((stuff) => (
        <Link href={`/stuff/${stuff.id}`} key={stuff.id}>
          <StuffItem post={stuff} />
        </Link>
      ))}
    </div>
  );
};

export default MyStuffList;
