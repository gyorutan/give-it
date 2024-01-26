"use client";

import { api } from "@/lib/api";
import { calculatePostTime } from "@/lib/formatting";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Stuff {
  id: string;
  title: string;
  content: string;
  userId: string;
  imageUrl: string;
  createdAt: Date;
}

interface User {
  name?: string;
  username?: string;
  image: string;
  studentId: string;
  email: string;
}

const StuffItem = ({ post }: { post: Stuff }) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const getUserProfile = async () => {
      const data = await axios
        .get(`${api}/users/${post.userId}`, {
          withCredentials: true,
        })
        .then((res) => res.data);
      setUser(data.user);
    };
    getUserProfile();
  }, [post.userId]);

  return (
    <div className="border flex justify-between py-2 px-4 mb-4 border-zinc-700 rounded-xl hover:bg-zinc-800 transition">
      <div className="flex flex-col gap-2">
        <span className="text-lg">{post.title}</span>
        <p className="space-x-2 text-sm flex items-center">
          {user?.image ? (
            <Image
              priority
              className="rounded-full"
              src={user?.image!}
              alt="user-image"
              height={18}
              width={18}
            />
          ) : null}
          <span>{user?.name}</span>
          <span className="text-zinc-700">|</span>
          <span>@{user?.username}</span>
          <span className="text-zinc-700">|</span>
          <span>{calculatePostTime(post!.createdAt)}</span>
        </p>
      </div>
      <div>
        {post.imageUrl ? (
          <Image
            priority
            className="rounded-lg"
            src={post.imageUrl}
            alt="post-image"
            width={55}
            height={55}
          />
        ) : null}
      </div>
    </div>
  );
};

export default StuffItem;
