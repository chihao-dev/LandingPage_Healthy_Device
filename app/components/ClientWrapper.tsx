'use client';

import dynamic from "next/dynamic";

const ThemeToggle = dynamic(() => import("./ThemeToggle"), { ssr: false });
const BehaviorToast = dynamic(() => import("./BehaviorToast"), { ssr: false });
const Chatbot = dynamic(() => import("./Chatbot"), { ssr: false });

export default function ClientWrapper() {
  return (
    <>
      <ThemeToggle />
      <BehaviorToast />
      <Chatbot />
    </>
  );
}
