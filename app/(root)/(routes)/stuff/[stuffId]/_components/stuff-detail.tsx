"use client";

import { HeartFill } from "@/components/icons/heart-fill";
import { HeartOutline } from "@/components/icons/heart-outline";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { calculatePostTime } from "@/lib/formatting";
import useAuth from "@/store/useAuth";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DeleteModal from "@/components/modal/delete-modal";
import toast from "react-hot-toast";

interface Post {
  id: string;
  title: string;
  content: string;
  userId: string;
  imageUrl: string;
  createdAt: Date;
  likeIds: string[];
}

interface User {
  id?: string;
  name?: string;
  username?: string;
  image: string;
  studentId: string;
  email: string;
}

const StuffDetail = () => {
  const router = useRouter();
  const { stuffId } = useParams();
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const [stuff, setStuff] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLikedStuff, setIsLikedStuff] = useState(false);

  const handleStuffLike = async () => {
    await axios.patch(
      `${api}/posts/stuff/like`,
      { stuffId },
      {
        withCredentials: true,
      }
    );
    setIsLikedStuff((pre) => !pre);
  };

  const deletePost = async (id: string) => {
    console.log(id);
    const data = await axios
      .delete(`${api}/posts/${id}`, {
        withCredentials: true,
      })
      .then((res) => res.data);
    if (data.success) {
      toast.success(data.message);
      router.push("/stuff");
    }
  };

  useEffect(() => {
    const fetchPostDetail = async () => {
      const data = await axios
        .get(`${api}/posts/${stuffId}`)
        .then((res) => res.data);

      if (data.success) {
        setStuff(data.post);
        if (stuff?.likeIds.includes(auth.userId)) {
          setIsLikedStuff(true);
        }
      } else {
        return;
      }
    };
    fetchPostDetail();
    if (stuff?.userId) {
      const getUserProfile = async () => {
        const data = await axios
          .get(`${api}/users/${stuff?.userId}`, {
            withCredentials: true,
          })
          .then((res) => res.data);
        setUser(data.user);
      };
      getUserProfile();
    }
  }, [stuff?.userId]);

  return (
    <>
      <div className="border border-zinc-700 rounded-xl flex flex-col">
        <div className="flex flex-col gap-2 p-4">
          <div className="flex justify-between">
            <div className="text-lg">{stuff?.title}</div>
            {auth.userId === stuff?.userId ? (
              <div className="flex gap-2">
                <Button
                  size={"sm"}
                  className="bg-inherit border border-zinc-700 hover:bg-zinc-800"
                >
                  수정
                </Button>
                <Button
                  size={"sm"}
                  onClick={() => setOpen(true)}
                  variant={"destructive"}
                  className="font-bold"
                >
                  삭제
                </Button>
              </div>
            ) : null}
          </div>
          <div className="text-sm text-opacity-90 text-gray-100 flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <div className="flex gap-3 items-center">
                <span className="flex gap-1.5 items-center">
                  {user?.image ? (
                    <Image
                      priority
                      src={user.image}
                      width={22}
                      height={22}
                      alt="writer profile"
                      className="rounded-full"
                    />
                  ) : null}
                  <span>{user?.name}</span>
                </span>
                <span className="text-zinc-700">|</span>
                <Link
                  className="hover:text-white transition"
                  href={`/user/${user?.id}`}
                >
                  @{user?.username}
                </Link>
                <span className="text-zinc-700">|</span>
                <span>{calculatePostTime(stuff?.createdAt!)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t-[1px] border-zinc-700"></div>
        <div className="p-4">
          <div className="flex flex-col gap-4">
            <p>{stuff?.content}</p>
            {stuff?.imageUrl ? (
              <Image
                src={stuff.imageUrl}
                alt="post-image"
                height={200}
                width={200}
                priority
              />
            ) : null}
          </div>
        </div>
        <div className="border-t-[1px] border-zinc-700"></div>
        <div className="p-4">
          <div className="flex gap-2 justify-center">
            <Button
              onClick={handleStuffLike}
              className="bg-inherit border border-zinc-700"
            >
              {isLikedStuff ? (
                <HeartFill className="w-6 h-6" />
              ) : (
                <HeartOutline className="w-6 h-6" />
              )}
            </Button>
            <Button
              onClick={handleStuffLike}
              className="bg-inherit border border-zinc-700"
            >
              <LinkIcon size={24} />
            </Button>
          </div>
        </div>
      </div>
      <div className="border border-zinc-700 rounded-xl flex flex-col">
        <div className="flex flex-col p-4">댓글</div>
      </div>
      <DeleteModal
        open={open}
        setOpen={setOpen}
        deletePost={deletePost}
        stuffId={stuff?.id}
      />
    </>
  );
};

export default StuffDetail;
