"use client";

import { api } from "@/lib/api";
import axios from "axios";
import React, { useEffect, useState } from "react";
import StuffItem from "./stuff-item";
import Link from "next/link";

interface Posts {
  id: string;
  title: string;
  content: string;
  userId: string;
  imageUrl: string;
  createdAt: Date;
}

const StuffList = () => {
  const [posts, setPosts] = useState<Posts[]>([]);
  const fetchAllPosts = async () => {
    const data = await axios.get(`${api}/posts`).then((res) => res.data);
    console.log(data);
    setPosts(data.posts);
  };
  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <Link href={`/stuff/${post.id}`} key={post.id}>
          <StuffItem post={post} />
        </Link>
      ))}
    </div>
  );
};

export default StuffList;
