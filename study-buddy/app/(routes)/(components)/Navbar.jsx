"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation"; // import useRouter for navigation
import { FaHome } from "react-icons/fa";
import { MdExplore } from "react-icons/md";
import { TbChartBarPopular } from "react-icons/tb";
import { MdUpload } from "react-icons/md";
import { useUserAuth } from "../_utils/auth-context";
import { db } from "../_utils/firebase"; // Make sure to import your Firestore instance
import { collection, query, where, getDocs } from "firebase/firestore"; // Firestore functions

const Navbar = () => {
  const pathName = usePathname();
  const router = useRouter(); // Used to navigate
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [suggestions, setSuggestions] = useState([]); // State for search suggestions
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
    }
  }, [user]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value); // Update search query state
    if (event.target.value.length > 2) {
      // Fetch search suggestions after user types 3 or more characters
      fetchSearchSuggestions(event.target.value);
    } else {
      setSuggestions([]); // Clear suggestions when search is too short
    }
  };

  const fetchSearchSuggestions = async (queryText) => {
    try {
      const quizzesRef = collection(db, "quizzes"); // Reference to your quizzes collection
      const q = query(
        quizzesRef,
        where("title", ">=", queryText), // Search in the title field
        where("title", "<=", queryText + "\uf8ff") // Query that starts with the queryText
      );

      const querySnapshot = await getDocs(q);
      const fetchedSuggestions = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedSuggestions.push(data.title); // You can also include more fields like questions
      });

      setSuggestions(fetchedSuggestions);
    } catch (error) {
      console.error("Error fetching search suggestions: ", error);
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery) {
      router.push(`/search-results?query=${searchQuery}`); // Navigate to search results page
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion); // Update search query with clicked suggestion
    router.push(`/search-results?query=${suggestion}`); // Navigate to search results page
  };

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

      <form onSubmit={handleSearchSubmit} className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search"
          className="p-2 w-96 font-semibold rounded-xl text-black outline-none"
        />
        <button type="submit" className="absolute top-3 right-3">
          <FaSearch className="text-black" />
        </button>
      </form>

      {userLoggedIn ? (
        <div className="flex items-center gap-6">
          <div>
            <Link
              href={"/upload-quiz"}
              className="text-white text-sm border-white border-2 p-2 flex gap-2 items-center rounded-xl hover:border-2 hover:bg-white hover:text-black hover:border-white duration-500 transition-all "
            >
              <MdUpload />
              <span>Upload Your Quiz</span>
            </Link>
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
