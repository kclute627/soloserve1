"use client";

import { useState } from "react";
import { FadeLoader } from "react-spinners";
import { v4 as uuidv4 } from "uuid";
import logo from "../../../public/logo.png";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import { signInEmail } from "../firebase/firebase";
import ErrorPopUp from "../components/ErrorPopUp";
import FlexAuto from "../layout/FlexAuto";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleError = (error) => {
    const newError = {
      message: error.message,
      id: uuidv4(),
      code: error.code,
    };

    setError((e) => {
      return [...e, newError];
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setError((e) => {
        return e.filter((e) => e.id !== newError.id);
      });
    }, 5000);
  };

  const signInFunction = async () => {
    setLoading(true);
    try {
      const userCredential = await signInEmail(email, password);

      router.push("/dashboard");
    } catch (error) {
      /// throw error on page
      handleError(error);
      console.error("Error sending verification code:", error);
    }
    setLoading(false);
  };
  return (
    <>
      <FlexAuto classNameTop="background h-max pb-[50rem]">
        <Header />

        <div className="flex justify-center w-[50rem] items-center m-auto">
          <div className="flex  max-h-full mt-10 rounded-xl shadow-lg  bg-white min-h-full flex-1 flex-col justify-start items-center px-6 py-12 lg:px-8 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <Image
                className="mx-auto h-[10rem] w-auto"
                src={logo}
                alt="Solo Serve Logo"
              />
              <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" action="#" method="POST">
                {error.length > 0 ? (
                  error.map((e) => (
                    <ErrorPopUp message={e.message} key={e.id} />
                  ))
                ) : (
                  <></>
                )}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primaryGreen sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="text-sm">
                      <a
                        href="forgot-password"
                        className="font-semibold text-gray-950 hover:text-gray-700"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primaryGreen sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    onClick={signInFunction}
                    disabled={!email || !password}
                    className="flex w-full justify-center rounded-md bg-primaryGreen px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primaryGreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {loading ? (
                      <FadeLoader color="#fff" height={2} />
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?{" "}
                <a
                  href="/signup"
                  className="font-semibold leading-6 text-gray-950 hover:text-gray-600"
                >
                  Start a 14 day free trial
                </a>
              </p>
            </div>
          </div>
        </div>
      </FlexAuto>
    </>
  );
}
