"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import useAuth from "@/store/useAuth";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const StuffCreatePage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState({
    imageLoading: false,
    createLoading: false,
  });
  const auth = useAuth();
  const deleteFile = () => {
    setFileName("");
    setImageUrl("");
  };
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const handleTextareaRef = () => {
    if (textAreaRef === null || textAreaRef.current === null) {
      return;
    }
    textAreaRef.current.style.height = "80px";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  };

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!auth.auth) {
      toast.error("로그인이 필요한 서비스입니다");
      return;
    }
    try {
      setLoading({ ...loading, imageLoading: true });
      const file = e.target.files![0];
      console.log("파일", file);

      const validFileTypes = ["image/jpg", "image/jpeg", "image/png"];

      if (!validFileTypes.find((type) => type === file.type)) {
        toast.error("업로드 할 수 없는 확장자입니다");
        deleteFile();
        return;
      }

      const form = new FormData();
      form.append("image", file);

      const data = await axios
        .post(`${api}/posts/image`, form, {
          withCredentials: true,
        })
        .then((res) => res.data);
      console.log(data);

      if (data.success) {
        setImageUrl(data.imageUrl);
      } else {
        toast.error("사진 업로드에 실패하였습니다");
        deleteFile();
        return;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading({ ...loading, imageLoading: false });
    }
  };

  const handleCreatePost = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.length > 20) {
      toast.error("제목은 16자 이하입니다");
    }
    try {
      setLoading({ ...loading, createLoading: true });

      const data = await axios
        .post(
          `${api}/posts`,
          { title, content, imageUrl },
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data);
      console.log(data);

      if (data.success) {
        toast.success(data.message);
        router.push("/stuff");
      } else {
        toast.error(data.message);
        setTitle("");
        setContent("");
        deleteFile();
      }
    } catch (error) {
      console.log(error);
      toast.error("알 수 없는 오류");
    } finally {
      setLoading({ ...loading, createLoading: false });
    }
  };

  useEffect(() => {
    handleTextareaRef();
  }, [content]);
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="border border-zinc-700 p-4 rounded-xl transition">
        <form className="flex flex-col gap-4" onSubmit={handleCreatePost}>
          <div className="mb-[8px]">
            <span className="text-xl font-bold">물건 내놓기</span>
          </div>
          <div className="relative">
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
              placeholder="어떤 물건인가요?"
              autoComplete="false"
              type="text"
              className="
              bg-inherit 
              w-full 
              py-2 
              px-3 
              text-md 
              font-bold 
              border 
              focus:ring-2
              focus:ring-blue-500
              border-zinc-700 
              outline-none 
              rounded-md 
              transition"
            />
          </div>
          <div className="relative">
            <textarea
              ref={textAreaRef}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              rows={2}
              required
              placeholder="물건에 대한 설명을 작성해주세요!"
              autoComplete="false"
              className="
              placeholder:text-md
              max-h-[200px]
              resize-none
              bg-inherit 
              w-full 
              pt-2 
              pb-2 
              px-3 
              text-md 
              font-bold 
              border 
              focus:ring-2
              focus:ring-blue-500
              border-zinc-700 
              outline-none 
              rounded-md 
              transition"
            />
          </div>
          <div>
            {imageUrl ? (
              <Button
                type="button"
                onClick={() => {
                  deleteFile();
                }}
                variant={"destructive"}
                className="rounded-xl font-bold"
              >
                사진삭제
              </Button>
            ) : (
              <div className="flex items-center rounded-full gap-4">
                <Button
                  asChild
                  className="font-bold bg-zinc-700 hover:bg-zinc-600 transition"
                >
                  <label
                    htmlFor="file"
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    {loading.imageLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </>
                    ) : (
                      <span>사진 업로드</span>
                    )}
                  </label>
                </Button>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-zinc-200/80">JPEG</span>
                  <span className="text-zinc-700">|</span>
                  <span className="text-sm text-zinc-200/80">JPG</span>
                  <span className="text-zinc-700">|</span>
                  <span className="text-sm text-zinc-200/80">PNG</span>
                </div>
                <div className="gap-2 hidden">
                  <Input
                    disabled={loading.imageLoading}
                    value={fileName}
                    type="file"
                    id="file"
                    className="cursor-pointer hidden bg-inherit text-white"
                    onChange={handleUploadImage}
                  />
                </div>
              </div>
            )}
          </div>
          <div>
            {loading.createLoading ? (
              <Button
                disabled
                type="submit"
                variant={"blue"}
                className="w-full"
              >
                <Loader2 className="h-4 w-4 animate-spin" />
              </Button>
            ) : (
              <Button
                disabled={!auth.auth}
                type="submit"
                variant={"blue"}
                className="w-full"
              >
                저장
              </Button>
            )}
          </div>
        </form>
      </div>
      <div className="pb-[65px]">
        {imageUrl ? (
          <Image
            className="p-4 border border-zinc-700 rounded-xl"
            src={imageUrl}
            width={125}
            height={125}
            alt="post-image"
            style={{ width: "auto", height: "auto" }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default StuffCreatePage;
