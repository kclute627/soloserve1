import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Header from "./components/Header";

export default function Landingpage() {
  const router = useRouter();
  return (
    <div className="flex background h-svh">
      <div className="flex-auto"></div>
      <div className="container">
        <Header />
      </div>
      <div className="flex-auto"></div>
    </div>
  );
}
