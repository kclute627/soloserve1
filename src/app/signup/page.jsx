"use client";
import { v4 as uuidv4 } from "uuid";

import { FadeLoader } from "react-spinners";
import InputForm from "./Input";
import { useState } from "react";
import {
  signUserUp,
  sendVerificationEmail,
  createUserInDb,
} from "../firebase/firebase";
import { signIn } from "next-auth/react";
import ErrorPopUp from "../components/ErrorPopUp";
import Header from "../components/Header";
import FormTop from "./FormTop";
import FlexAuto from "../layout/FlexAuto";
import Link from "next/link";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState({
    suite: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);

  async function signUp(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredentials = await signUserUp(email, password);

      if (userCredentials) {
        //send verification email
        await sendVerificationEmail(userCredentials.user);

        // create a user in the database
        const { user } = userCredentials;
        await createUserInDb(
          user,
          company,
          firstName,
          lastname,
          address,
          phone
        );
       await signIn("credentials", {
          email,
          password,
          redirect: true,
          callbackUrl: "/dashboard",
        });
      }
    } catch (error) {
      handleError(error);
      console.error("Error sending verification code:", error);
    }

    setLoading(false);
  }

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
  

  return (
    <FlexAuto classNameTop="background h-max pb-[15rem]">
      <Header className="" />

      <div className="flex justify-center w-[40rem] items-center m-auto">
        <div className="flex w-full max-h-full mt-10 rounded-xl shadow-lg  bg-white min-h-full flex-1 flex-col  px-6 py-12 lg:px-8 ">
          <FormTop />
          {error.length > 0 ? (
            error.map((e) => <ErrorPopUp message={e.message} key={e.id} />)
          ) : (
            <></>
          )}

          <div className="mt-10  sm:mx-auto sm:w-full sm:max-w-lg">
            <form className="space-y-2" action="#" method="POST">
              <div className="text-xl text-gray-600 font-bold mb-1">
                Your Information
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <InputForm
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    label="First Name"
                    id="name"
                    type="text"
                    autoComplete="given-name"
                    required={true}
                    placeHolder={"First Name"}
                  />
                </div>
                <div className="w-1/2">
                  <InputForm
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                    label="Last Name"
                    id="lastname"
                    type="text"
                    autoComplete="family-name"
                    required={true}
                    placeHolder={"Last Name"}
                  />
                </div>
              </div>

              <InputForm
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                label="Phone Number"
                id="phone"
                type="tel"
                autoComplete="tel"
                placeHolder={"Phone"}
                required={false}
              />

              <InputForm
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email Address"
                id="email"
                type="email"
                autoComplete="email"
                required={true}
                placeHolder={"Company"}
              />

              <InputForm
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                id="password"
                type="password"
                autoComplete="current-password"
                required={true}
                placeHolder={"Password"}
              >
                <div className="text-sm">
                  <Link
                    href="forgot-password"
                    className="font-semibold text-gray-950 hover:text-gray-700"
                  >
                    Forgot password?
                  </Link>
                </div>
              </InputForm>

              <div className="text-xl text-gray-600 font-bold mt-6">
                Company Information
              </div>

              <InputForm
                value={company}
                placeHolder={"Company"}
                onChange={(e) => setCompany(e.target.value)}
                label="Company Name *"
                id="commpany"
                type="text"
                autoComplete=""
                required={true}
              />

              <div className="flex space-x-7 mt-4">
                <div className="w-1/2">
                  <InputForm
                    value={address.street}
                    onChange={(e) =>
                      setAddress((cur) => {
                        const newAddress = {
                          ...cur,
                          street: e.target.value,
                        };

                        return newAddress;
                      })
                    }
                    label="Street"
                    placeHolder={"Street"}
                    id="street"
                    type="text"
                    autoComplete="address-level1"
                    required={false}
                  />
                </div>
                <div className="w-1/2">
                  <InputForm
                    value={address.suite}
                    onChange={(e) =>
                      setAddress((cur) => {
                        const newAddress = {
                          ...cur,
                          suite: e.target.value,
                        };

                        return newAddress;
                      })
                    }
                    label="Suite"
                    placeHolder={"Suite"}
                    id="suite"
                    type="text"
                    autoComplete="address-level2"
                    required={false}
                  />
                </div>
              </div>
              <div className="flex space-x-7 mt-4">
                <div className="">
                  <InputForm
                    value={address.city}
                    onChange={(e) =>
                      setAddress((cur) => {
                        const newAddress = {
                          ...cur,
                          city: e.target.value,
                        };

                        return newAddress;
                      })
                    }
                    label="City"
                    placeHolder={"City"}
                    id="city"
                    type="text"
                    autoComplete="address-level2"
                    required={false}
                  />
                </div>
                <div className="">
                  <InputForm
                    value={address.state}
                    onChange={(e) =>
                      setAddress((cur) => {
                        const newAddress = {
                          ...cur,
                          state: e.target.value,
                        };

                        return newAddress;
                      })
                    }
                    label="State"
                    placeHolder={"State"}
                    id="state"
                    type="text"
                    autoComplete="address-level1"
                    required={false}
                  />
                </div>
                <div className="">
                  <InputForm
                    value={address.zip}
                    onChange={(e) =>
                      setAddress((cur) => {
                        const newAddress = {
                          ...cur,
                          zip: e.target.value,
                        };

                        return newAddress;
                      })
                    }
                    label="Zip"
                    placeHolder={"Zip"}
                    id="zip"
                    type="text"
                    autoComplete=""
                    required={false}
                  />
                </div>
              </div>

              <div className="">
                <button
                  type="submit"
                  onClick={(e) => signUp(e)}
                  disabled={!email || !password}
                  className="flex mt-6 w-full justify-center rounded-md bg-primaryGreen px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primaryGreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
              Already Have An Account?{" "}
              <Link
                href="/signin"
                className="font-semibold leading-6 text-gray-950 hover:text-gray-600"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </FlexAuto>
  );
}
