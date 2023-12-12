"use client";

import React, { useEffect, useState } from "react";
import { IoIosBookmark, IoMdApps } from "react-icons/io";
import { MdLocalMovies, MdOutlineSettingsApplications } from "react-icons/md";
import { FaFilm } from "react-icons/fa6";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, setUserWishlist } from "../../Redux/User";
import { usePathname } from "next/navigation";
import { RiFilmFill } from "react-icons/ri";
import { Menu, Transition } from "@headlessui/react";

const Sidebar = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const pathname = usePathname();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      dispatch(setUserData(username));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("username");
    dispatch(setUserData(""));
    dispatch(setUserWishlist([]));
  };

  return (
    <div
      className="flex lg:flex-col w-24 justify-between items-center rounded-2xl py-6  relative bg-[#161d2f]
      max-lg:w-full  max-lg:h-[10%] max-lg:flex max-lg:rounded-none"
    >
      <Link href="/" className="max-[1000px]:px-6">
        <RiFilmFill size={32} fill="#fc4747" />
      </Link>

      <div className="flex justify-between items-center  w-full ">
        <span className="flex lg:flex-col gap-12   justify-center  items-center  w-full">
          <Link href="/" className=" cursor-pointer ">
            <IoMdApps
              size={32}
              fill={`${pathname === "/" ? "#fc4747" : "#5a698f"}`}
            />
          </Link>
          <Link href="/series">
            <MdLocalMovies
              size={32}
              fill={`${pathname === "/series" ? "#fc4747" : "#5a698f"}`}
            />
          </Link>

          {username ? (
            <Link href="/favorites" className=" cursor-pointer">
              <IoIosBookmark
                size={32}
                fill={`${pathname === "/favorites" ? "#fc4747" : "#5a698f"}`}
              />
            </Link>
          ) : (
            ""
          )}
        </span>
      </div>

      <div className="flex flex-col gap-2  px-6 relative items-center justify-center   ">
        <Menu>
          <Menu.Button>
            <img
              src="https://static-cdn.jtvnw.net/c3-vg/recap/2023/recap-goat.gif"
              alt=""
              width={42}
            />
          </Menu.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
            className="absolute bg-[#161d2f] max-lg:top-16 right-4 z-[9999] w-36 p-4 lg:left-24 rounded-md border border-gray-800"
          >
            <Menu.Items className="flex flex-col gap-2 ">
              {username.length > 0 ? (
                <button
                  className={`bg-[#fc4747]  rounded-md text-center hover:bg-white hover:text-black transition-all`}
                  onClick={logout}
                >
                  Logout
                </button>
              ) : (
                <>
                  <Menu.Item>
                    <Link
                      className={`bg-[#fc4747]  rounded-md text-center hover:bg-white hover:text-black transition-all`}
                      href="/login"
                    >
                      Login
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link
                      className={`bg-[#fc4747]  rounded-md text-center hover:bg-white hover:text-black transition-all`}
                      href="/register"
                    >
                      Register
                    </Link>
                  </Menu.Item>
                </>
              )}
            </Menu.Items>
          </Transition>
        </Menu>

        {/* {username.length > 0 ? (
          <button className="bg-blue-950 p-1 px-2 rounded-md" onClick={logout}>
            Logout
          </button>
        ) : (
          <>
            <Link href="login" className="bg-blue-950 p-1 rounded-md">
              Login
            </Link>
            <Link href="register" className="bg-blue-950 p-1 rounded-md">
              Register
            </Link>{" "}
          </>
        )} */}
      </div>
    </div>
  );
};

export default Sidebar;
