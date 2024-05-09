"use client";
import { onAuthStateChanged, signOut } from "firebase/auth";

import {
  getUserSuccess,
  getUserFailure,
  getUserRequest,
} from "./Redux/actions";
import { Provider, useDispatch, useSelector } from "react-redux";

import { redirect, useRouter } from "next/navigation";
import { auth, getUserFromDb } from "./firebase/firebase";
import { useEffect, useState } from "react";
import Landingpage from "./LandingPage";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      dispatch(getUserRequest());
      if (user && user.emailVerified) {
        const uid = user.uid;
        try {
          const userData = await getUserFromDb(user);
          dispatch(getUserSuccess(userData));
          router.push("/dashboard");

          console.log("uid", uid);
        } catch (error) {
          dispatch(getUserFailure(error));
        }
      }
      if (user && user.emailVerified == false) {
        const uid = user.uid;
        try {
          const userData = await getUserFromDb(user);
          console.log(uid)
          dispatch(getUserSuccess(userData));
          router.push("/signup");
        } catch (error) {
          dispatch(getUserFailure(error));
        }
        
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
