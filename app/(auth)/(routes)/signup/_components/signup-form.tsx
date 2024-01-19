'use client'

import { Button } from "@/components/ui/button";
import React from "react";

const SignupForm = () => {
  return (
    <form className="space-y-4">
      <div className="relative">
        <label className="absolute left-3 top-2 font-bold text-sm">이름</label>
        <input
          required
          autoComplete="false"
          type="text"
          className="
        bg-inherit 
        w-full 
        pt-9 
        pb-2 
        px-3 
        text-lg 
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
        <label className="absolute left-3 top-2 font-bold text-sm">
          닉네임
        </label>
        <input
          required
          autoComplete="false"
          type="text"
          className="
        bg-inherit 
        w-full 
        pt-9 
        pb-2 
        px-3 
        text-lg 
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
        <label className="absolute left-3 top-2 font-bold text-sm">학번</label>
        <input
          required
          autoComplete="false"
          type="text"
          className="
        bg-inherit 
        w-full 
        pt-9 
        pb-2 
        px-3 
        text-lg 
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
        <label className="absolute left-3 top-2 font-bold text-sm">
          비밀번호
        </label>
        <input
          required
          autoComplete="false"
          type="password"
          className="
        tracking-[4px]
        bg-inherit 
        w-full 
        pt-9 
        pb-2 
        px-3 
        text-lg 
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
      <Button type="submit" variant={"blue"} className="w-full">
        회원가입
      </Button>
    </form>
  );
};

export default SignupForm;
