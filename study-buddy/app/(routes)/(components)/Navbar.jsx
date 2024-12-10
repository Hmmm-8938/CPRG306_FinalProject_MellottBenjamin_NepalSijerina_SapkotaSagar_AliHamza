"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { MdExplore } from "react-icons/md";
import { TbChartBarPopular } from "react-icons/tb";
import { MdUpload } from "react-icons/md";
import { useUserAuth } from "../_utils/auth-context";

const Navbar = () => {
  const pathName = usePathname();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const onSignIn = async () => {
    await gitHubSignIn();
  };

  const onSignOut = async () => {
    await firebaseSignOut();
    setUserLoggedIn(false);
  };

  useEffect(() => {
    setUserLoggedIn(false);
  }, []);

  useEffect(() => {
    if (user) {
      setUserLoggedIn(true);
      console.log(user);
      console.log(user.photoURL);
    }
  }, [user]);

  return (
    <div className="text-white py-10 flex items-center gap-2 justify-between ">
      <div className="space-x-4 flex items-center">
        <Link
          className={`${
            pathName == "/home" ? "font-semibold" : "font-normal"
          }  hover:border-b-2 flex gap-2 items-center `}
          href={"/home"}
        >
          <FaHome />
          <span>Home</span>
        </Link>
        <Link
          className={`${
            pathName == "/explore" ? "font-semibold" : "font-normal"
          }  hover:border-b-2 flex gap-2 items-center `}
          href={"/explore"}
        >
          <MdExplore />
          <span>Explore</span>
        </Link>
        <Link
          className={`${
            pathName == "/popular" ? "font-semibold" : "font-normal"
          }  hover:border-b-2 flex gap-2 items-center `}
          href={"/popular"}
        >
          <TbChartBarPopular />
          <span>Popular</span>
        </Link>
      </div>
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="p-2 w-96 font-semibold rounded-xl text-black outline-none"
        />
        <button className="absolute top-3 right-3">
          <FaSearch className="text-black  " />
        </button>
      </div>

      {userLoggedIn ? (
        <div className="flex items-center gap-6">
          <div>
            <button className="text-white text-sm border-white border-2 p-2 flex gap-2 items-center rounded-xl hover:border-2 hover:bg-white hover:text-black hover:border-white duration-500 transition-all ">
              <MdUpload />
              <span>Upload Your Quiz</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Image
              height={20}
              width={20}
              alt="Profile image"
              src={user?.photoURL}
              className="w-8 h-8 bg-slate-400 rounded-full"
            />
            <span className="font-semibold">Profile</span>
          </div>
          <div>
            <button
              onClick={onSignOut}
              className="bg-red-500 text-sm p-2 rounded hover:bg-red-400 transition-all duration-200 text-white font-semibold"
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={onSignIn}
            className="bg-blue-500 p-2 rounded hover:bg-blue-400 transition-all duration-200 text-white"
          >
            Sign In
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
