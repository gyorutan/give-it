"use client";

import { Button } from "@/components/ui/button";
import React, { ChangeEvent, useState } from "react";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    studentId: "",
    password: "",
  });

  const handleLogin = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("로그인");
  };

  return (
    <form className="space-y-4" onSubmit={handleLogin}>
      <div className="relative">
        <label className="absolute left-3 top-2 font-bold text-sm">학번</label>
        <input
          value={formData.studentId}
          onChange={(e) => {
            setFormData({ ...formData, studentId: e.target.value });
          }}
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
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
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
        로그인
      </Button>
    </form>
  );
};

export default LoginForm;
