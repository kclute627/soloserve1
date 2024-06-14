"use client";

import { Fragment, useEffect, useState } from "react";
import Script from "next/script";
import Logo from "../components/logo/logo";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  BanknotesIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { auth, getJobsByUser, getUserFromDb } from "../firebase/firebase";
import {
  getUserRequest,
  getUserFailure,
  getUserSuccess,
  logUserOut,
} from "../Redux/actions";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter, useParams, usePathname } from "next/navigation";
import SidebarDesktop from "./Layout/SidebarDesktop";
import SidebarBottom from "./Layout/SidebarBottom";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { getAllJobs } from "../Redux/Actions/jobActiontypes";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const teams = [
  { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
  { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];
const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign Out", href: "#" },
];

function Layout({ children }) {
  const [currentNavigation, setCurrentNavigation] = useState("Dashboard");
  const [navigation, setNavigation] = useState([
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true },
    {
      name: "Jobs",
      href: "/dashboard/jobs",
      icon: DocumentDuplicateIcon,
      current: false,
    },
    {
      name: "Clients",
      href: "/dashboard/clients",
      icon: UserGroupIcon,
      current: false,
    },
    {
      name: "Invoices",
      href: "/dashboard/invoices",
      icon: BanknotesIcon,
      current: false,
    },
    {
      name: "Servers",
      href: "/dashboard/servers",
      icon: UsersIcon,
      current: false,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Cog6ToothIcon,
      current: false,
    },
    {
      name: "Notes",
      href: "/dashboard/notes",
      icon: Cog6ToothIcon,
      current: false,
    },
  ]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [path, setPath] = useState();
  const router = useRouter();

  const path1 = usePathname();

  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);


  const handleSignOut = () => {
    auth.signOut().then(() => {
      dispatch(logUserOut())
      console.log('User signed out');
    }).catch((error) => {
      console.error('Error signing out: ', error);
    });
  };

  const sidebarClick = (e, itemname) => {
    e.preventDefault();

    setPath(itemname);
  };

  useEffect(() => {
    if (path1 !== path) {
      setPath(path1);
    }
  }, [path1]);

  useEffect(() => {
    onAuthStateChanged(auth, async (authUser) => {
      dispatch(getUserRequest());
      if (authUser) {
        try {
          const userInfo = await getUserFromDb(authUser);
          dispatch(getUserSuccess(userInfo));
          
         
        } catch (error) {
          dispatch(getUserFailure(error));
          console.log(error, "error line98");
        }
      }
    });

    /// get all the jobs for the user 

  



  }, []);

  useEffect(()=>{
    
    if(user){
      console.log(user, "userrrrrrrrrrrrr")
      getJobs()
    }
  }, [user])

  const getJobs = async () => {

    try {

      const jobs = await getJobsByUser(user)

      dispatch(getAllJobs(jobs))
      
    } catch (error) {
      
    }


      
    
  }

  return (
    <>
      <Script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAIOxB7XBVlzjuseYy2jlHAEVnWgDLVbWY&libraries=places" />
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      <Logo />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  onClick={(e) => sidebarClick(e, item.href)}
                                  className={classNames(
                                    item.name == currentNavigation
                                      ? "bg-gray-50 text-indigo-600"
                                      : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.name == currentNavigation
                                        ? "text-indigo-600"
                                        : "text-gray-400 group-hover:text-indigo-600",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <SidebarBottom teams={teams} />
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <SidebarDesktop
          navigation={navigation}
          currentNavigation={currentNavigation}
          teams={teams}
          setCurrentNavigation={setCurrentNavigation}
          sidebarClick={sidebarClick}
          path={path}
        />

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 w-full">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-200 lg:hidden"
              aria-hidden="true"
            />
            <div className="flex flex-1 items-center w-full self-stretch">
              <div className="font-poppins pt-1">
                <div className="top font-poppins text-sm text-gray-500">
                  Hello, {user ? user.user_first_name : ""} 👋
                </div>
                <div className="font-bold text-lg">Welcome Back</div>
              </div>
              <div className="hidden md:flex md:w-[15rem] lg:w-[30rem] bg-gray-200/80 rounded-full relative pl-10  items-center ml-10">
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute inset-y-0 left-4 h-full w-6 text-gray-400"
                  aria-hidden="true"
                />

                <div className="h-5 w-0.5 bg-gray-300 mx-2"></div>
                <input
                  id="search-field"
                  autoComplete="off"
                  className=" w-full bg-transparent border-0 outline-none border-gray-300 focus:border-0 focus:bg-transparent focus:outline-none p-2 rounded-md focus:ring-0 appearance-none focus:appearance-none"
                  placeholder="Search..."
                  type="text"
                  name="search"
                  style={{ appearance: "none" }}
                />
              </div>
            </div>

            <div className="flex gap-x-4  lg:gap-x-6  ">
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button
                  type="button"
                  className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Separator */}
                <div
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
                  aria-hidden="true"
                />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full bg-gray-50"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                        aria-hidden="true"
                      >
                        
                      </span>
                      <ChevronDownIcon
                        className="ml-2 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <Link
                              href={item.href}
                              onClick={item.name == "Sign Out" ? ()=>handleSignOut() : null}
                              className={classNames(
                                active ? "bg-gray-50" : "",
                                "block px-3 py-1 text-sm leading-6 text-gray-900"
                              )}
                            >
                              {item.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main
            className=" bg-[#4c4adc20] py-10 max-h-full min-h-screen"
          >
            <div className="px-4 sm:px-6 lg:px-8 ">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Layout;
