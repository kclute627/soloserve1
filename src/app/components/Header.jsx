"use client";

import Link from "next/link";
import logo from "../../../public/logo.png";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import Image from "next/image";
import { auth } from "../firebase/firebase";
import { useRouter } from "next/navigation";

function Header() {
  const navItems = [
    {
      title: "Pricing",
      link: "#pricing",
    },
    {
      title: "Why Us",
      link: "#why",
    },
    {
      title: "Compare",
      link: "#compare",
    },
    {
      title: "Learn",
      link: "/learn",
    },
  ];
  const router = useRouter();

  const signOutFunction = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className="mt-10 w-full h-[7rem] bg-white rounded-full shadow-xl flex justify-between items-center ">
      <div className="left font-bold text-white pl-20 flex justify-center items-center">
        <div>
          <Link href="/">
            <Image className="h-1/2 w-1/2" src={logo} alt="logo" />
          </Link>
        </div>
        <div className="space-x-8 flex">
          {navItems.map((item) => {
            return (
              <div
                key={item.link}
                className="text-gray-800 font-light text-xl hover:-translate-y-0.5 transition-all delay-100"
              >
                <Link key={item.link} href={item.link}>
                  {item.title}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className="right flex justify-center items-center">
        <>
          <div>
            <button
              onClick={() => router.push("/signin")}
              className=" px-6 py-4 bg-gray-300 rounded-xl text-gray-900 shadow-md mr-2"
            >
              Log In
            </button>
          </div>
          <div>
            <button
              onClick={() => router.push("/signup")}
              className="px-6 py-4 bg-gray-950 rounded-3xl text-gray-300 shadow-xl mr-10"
            >
              Sign Up Free
            </button>
          </div>
        </>
      </div>
    </div>
  );
}

export default Header;
