"use client";

import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { auth } from "../firebase/firebase";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import NotVerified from "./NotVerified";




function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState("");

  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        router.push("/dashboard");
        // ...
        /// Figure a wau out to locate user in DB and then add to state
        setUser(user)
        console.log("uid", uid);
      }
      
      if (!user) {
        // User is signed out
        // ...
        router.push("/");
        //   console.log("user is logged out");
      }
    });
  }, [user]);

  console.log(user, "user")

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      {user.emailVerified == false ? <NotVerified /> : <></>}
     
    </>
  );
}
