"use client";
import React, { useEffect, useState } from "react";
import generateData from "../_utils/gemini/geminiSetup";
import { db } from "../_utils/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useUserAuth } from "../_utils/auth-context";

async function addDataToFireStore(title, quizInfo, authorName) {
  try {
    // Corrected: Use `addDoc` with the correct collection reference and data object.
    const docRef = await addDoc(
      collection(db, "quizes"), // Reference to the 'quizes' collection
      {
        title: title,
        quizInfo: quizInfo,
        author: authorName,
        upVote: 0,
        downVote: 0,
        createdAt: new Date(),
      }
    );

    console.log("Document has been written with ID: ", docRef.id);
    return true;
  } catch (error) {
    console.error("Error adding document", error);
    return false;
  }
}

const UploadQuizPage = () => {
  const [title, setTitle] = useState("");
  const [lectureDetails, setLectureDetails] = useState("");
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const handleUpload = async () => {
    if (!title || !lectureDetails) {
      alert("Please fill out all fields before uploading.");
      return;
    }

    // Example payload to send
    const quizData = {
      title,
      lectureDetails,
      createdAt: new Date(),
    };

    const output = await generateData(quizData);
    console.log(output);

    await addDataToFireStore(title, output, user.displayName);

    alert("Quiz uploaded successfully!");

    // // Reset form after submission
    // setTitle("");
    // setLectureDetails("");
  };

  return (
    <div className="min-h-screen  flex flex-col items-center p-5">
      <div className="text-white font-semibold text-2xl mb-6">
        Upload Your Quiz
      </div>

      <div className="w-full max-w-lg p-6 rounded-lg shadow-md">
        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-gray-400 mb-2" htmlFor="title">
            Quiz Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter the quiz title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Lecture Details Textarea */}
        <div className="mb-4">
          <label className="block text-gray-400 mb-2" htmlFor="lectureDetails">
            Lecture Notes
          </label>
          <textarea
            id="lectureDetails"
            rows="6"
            placeholder="Paste your lecture notes here..."
            value={lectureDetails}
            onChange={(e) => setLectureDetails(e.target.value)}
            className="w-full p-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Upload Quiz
        </button>
      </div>
    </div>
  );
};

export default UploadQuizPage;
