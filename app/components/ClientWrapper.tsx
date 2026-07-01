'use client';

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ThemeToggle = dynamic(() => import("./ThemeToggle"), { ssr: false });
const BehaviorToast = dynamic(() => import("./BehaviorToast"), { ssr: false });
const Chatbot = dynamic(() => import("./Chatbot"), { ssr: false });

export default function ClientWrapper() {
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    // Trì hoãn Chatbot để giảm TBT (Total Blocking Time)
    const timer = setTimeout(() => setShowChat(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ThemeToggle />
      <BehaviorToast />
      {showChat && <Chatbot />}
    </>
  );
}
