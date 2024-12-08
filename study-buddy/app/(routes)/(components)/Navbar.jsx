"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { MdExplore } from "react-icons/md";
import { TbChartBarPopular } from "react-icons/tb";

const Navbar = () => {
  const pathName = usePathname();
  console.log(pathName);
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
      <div className="flex items-center gap-2">
        <Image
          height={20}
          width={20}
          alt="Profile image"
          src="https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg"
          className="w-8 h-8 bg-slate-400 rounded-full"
        />
        <span className="font-semibold">Profile</span>
      </div>
    </div>
  );
};

export default Navbar;
