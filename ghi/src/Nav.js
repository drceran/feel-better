import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { useGetTokenQuery } from "./store/usersApi";
import { useNavigate } from "react-router-dom";
import logo from './images/logo.png';
import "./Nav.css";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Nav() {
  const navigate = useNavigate();
  const { data } = useGetTokenQuery();
  const [navigation, setNavigation] = useState([]);

  useEffect(() => {
    if (data && data?.access_token) {
      setNavigation([
        {
          name: "Your Profile",
          href: "#",
          current: true,
          destination: "/jotters/"
        },
        {
          name: "Entries",
          href: "#",
          current: true,
          destination: "/journals/",
        },
        {
          name: "Messages",
          href: "#",
          current: true,
          destination: "/messages/",
        },
        {
          name: "Appointments",
          href: "#",
          current: true,
          destination: "/appointments/",
        },
        {
          name: "Resources",
          href: "#",
          current: true,
          destination: "/resources/",
        },
        {
          name: "Pricing",
          href: "#",
          current: true,
          destination: "/pricing/",
        },
      ]);
    } else {
      setNavigation([]);
    }
  }, [data]);

  return (
    <Disclosure as="nav" style={{ fontFamily: "Short Stack, cursive", fontSize: '20px' }} className="navbar bg-[#8a7D80] w-screen">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-[#626670] hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <button onClick={() => navigate("/home")}>
                    <img
                      className="block h-8 w-auto lg:hidden"
                      src={logo}
                      alt="JournalJotter logo" />
                    <img
                      className="hidden h-8 w-auto lg:block"
                      src={logo}
                      alt="JournalJotter logo"
                    />
                  </button>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex items-center justify-center">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-[#8A7D80] text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(item.destination);
                        }}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-7 sm:pr-0">
                {/* Profile dropdown */}
                {data ? (
                  <>


                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex rounded-full bg-[#8A7D80] text-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>
                          <span className="text-slate-100 m-2">
                            Welcome {data?.account.first_name}
                          </span>
                          <div>
                            <CurrencyDollarIcon className="block text-amber-300 m-2 h-6 w-6" />
                          </div>
                          <span className="text-amber-300 m-2">
                            {data?.account.balance}
                          </span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={data?.account.profile_picture}
                            alt=""
                          />
                        </Menu.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <p
                                href="#"
                                onClick={() =>
                                  navigate("/editProfile/")
                                }
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Edit Profile
                              </p>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <p
                                href="#"
                                onClick={() => navigate("/logout")}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Logout
                              </p>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </>
                ) : (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://www.clipartmax.com/png/middle/155-1559319_learn-open-book-icon-vector.png"
                          alt=""
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <p
                              href="#"
                              onClick={() => navigate("/signup")}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Signup
                            </p>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <p
                              href="#"
                              onClick={() => navigate("/login")}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Login
                            </p>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.destination);
                  }}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
