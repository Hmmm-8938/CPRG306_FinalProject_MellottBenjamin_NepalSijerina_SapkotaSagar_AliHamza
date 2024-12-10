"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { IoArrowUpCircle } from "react-icons/io5";
import { IoArrowDownCircle } from "react-icons/io5";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../_utils/firebase"; // Ensure correct import for Firebase
import { useUserAuth } from "../_utils/auth-context";

// Function to format the createdAt timestamp into a human-readable date
const formatDate = (timestamp) => {
  if (!timestamp) return "";

  const date = timestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date object
  return date.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
};

const QuizTemplate = ({ item }) => {
  const { user } = useUserAuth(); // Get the user from auth context
  const [userVoted, setUserVoted] = useState(false); // To track if user has voted
  const [userHasUpvoted, setUserHasUpvoted] = useState(false); // To track if user upvoted
  const [userHasDownvoted, setUserHasDownvoted] = useState(false); // To track if user downvoted

  // Local state for upvote and downvote counts
  const [upVoteCount, setUpVoteCount] = useState(item.upVote || 0);
  const [downVoteCount, setDownVoteCount] = useState(item.downVote || 0);

  // Format the createdAt timestamp into a human-readable format
  const formattedDate = formatDate(item.createdAt);

  useEffect(() => {
    // Check if the user has upvoted or downvoted when the component loads
    if (user) {
      setUserHasUpvoted(item.upVotes?.includes(user.uid) || false);
      setUserHasDownvoted(item.downVotes?.includes(user.uid) || false);
    }
  }, [user, item.upVotes, item.downVotes]);

  // Handle Upvote
  const handleUpvote = async () => {
    if (!user) {
      alert("Please login to upvote and downvote!!");
      return;
    }

    if (userHasUpvoted) {
      alert("You have already upvoted this quiz.");
      return;
    }

    // If the user has downvoted, remove the downvote and add upvote
    if (userHasDownvoted) {
      await updateDoc(doc(db, "quizes", item.id), {
        downVote: downVoteCount - 1,
        downVotes: arrayRemove(user.uid),
      });
      setDownVoteCount(downVoteCount - 1);
    }

    try {
      // Add the user to the upvotes list and increase the upvote count
      await updateDoc(doc(db, "quizes", item.id), {
        upVote: upVoteCount + 1,
        upVotes: arrayUnion(user.uid),
      });
      setUpVoteCount(upVoteCount + 1); // Update the upvote count locally
      setUserHasUpvoted(true); // Mark that the user has upvoted
      setUserHasDownvoted(false); // Reset downvoted state
    } catch (error) {
      console.error("Error upvoting quiz:", error);
    }
  };

  // Handle Downvote
  const handleDownvote = async () => {
    if (!user) {
      alert("Please login to upvote and downvote!!");
      return;
    }

    if (userHasDownvoted) {
      alert("You have already downvoted this quiz.");
      return;
    }

    // If the user has upvoted, remove the upvote and add downvote
    if (userHasUpvoted) {
      await updateDoc(doc(db, "quizes", item.id), {
        upVote: upVoteCount - 1,
        upVotes: arrayRemove(user.uid),
      });
      setUpVoteCount(upVoteCount - 1);
    }

    try {
      // Add the user to the downvotes list and increase the downvote count
      await updateDoc(doc(db, "quizes", item.id), {
        downVote: downVoteCount + 1,
        downVotes: arrayUnion(user.uid),
      });
      setDownVoteCount(downVoteCount + 1); // Update the downvote count locally
      setUserHasDownvoted(true); // Mark that the user has downvoted
      setUserHasUpvoted(false); // Reset upvoted state
    } catch (error) {
      console.error("Error downvoting quiz:", error);
    }
  };

  return (
    <div className="bg-[#403179] shadow-lg hover:bg-[#3c2c74] transition-all duration-300 text-white py-4 px-5 rounded-xl space-y-4">
      <div className="space-y-1">
        <Link
          href={`quiz/${item.id}`}
          className="font-semibold text-xl cursor-pointer hover:underline"
        >
          {item.title}
        </Link>
        {/* Display formatted Upload Date */}
        <h5 className="text-xs opacity-50">Upload Date: {formattedDate}</h5>
        <h5 className="text-xs cursor-pointer hover:underline">
          Author: {item.author}
        </h5>
      </div>

      <p className="text-sm">{item?.description}</p>
      <div className="flex gap-2">
        <div className="flex items-center gap-1">
          <IoArrowUpCircle
            className={`cursor-pointer ${
              userHasUpvoted ? "text-blue-500" : ""
            }`}
            onClick={handleUpvote}
            disabled={userHasUpvoted} // Disable if already upvoted
          />
          <span>{upVoteCount}</span>
        </div>
        <div className="flex items-center gap-1">
          <IoArrowDownCircle
            className={`cursor-pointer ${
              userHasDownvoted ? "text-red-500" : ""
            }`}
            onClick={handleDownvote}
            disabled={userHasDownvoted} // Disable if already downvoted
          />
          <span>{downVoteCount}</span>
        </div>
      </div>
    </div>
  );
};

export default QuizTemplate;
