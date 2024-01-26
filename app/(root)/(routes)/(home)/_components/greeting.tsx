"use client";

import useAuth from "@/store/useAuth";
import React from "react";

const Greeting = () => {
  const auth = useAuth();
  return (
    <>
      <p className="text-lg font-bold mb-4 ml-1">😊 {auth.name}님 환영합니다</p>
    </>
  );
};

export default Greeting;
