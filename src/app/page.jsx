/// do some checking here
"use client";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { auth } from "./firebase/firebase";
import { useEffect, useState } from "react";
import Landingpage from "./LandingPage";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        router.push("/dashboard");
        // ...
        console.log("uid", uid);
      }
      if (user && user.emailVerified == false) {
        router.push("/signup");
      } else {
        // User is signed out
        // ...
        //   router.push("/");
        //   console.log("user is logged out");
      }
    });
  }, []);

  return (
    <main className="">
      <Landingpage />
    </main>
  );
}
