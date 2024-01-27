"use client";

import { api } from "@/lib/api";
import useAuth from "@/store/useAuth";
import axios from "axios";
import React, { useEffect } from "react";

const Greeting = () => {
  const auth = useAuth();
  useEffect(() => {
    const cookie = async () => {
      const data = await axios.get(`${api}/users/profile`, {
        withCredentials: true,
      });
    };
    cookie();
  }, []);
  return (
    <>
      <p className="text-lg font-bold mb-4 ml-1">😊 {auth.name}님 환영합니다</p>
    </>
  );
};

export default Greeting;
