"use client";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../_utils/firebase"; // Ensure you import your Firebase configuration
import QuizTemplate from "../(components)/QuizTemplate";

const Page = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const quizCollectionRef = collection(db, "quizes"); // Reference to the 'quizes' collection
        const querySnapshot = await getDocs(quizCollectionRef); // Fetch the quizzes
        const quizzesData = [];

        // Loop through the documents to extract the data
        querySnapshot.forEach((doc) => {
          quizzesData.push({ id: doc.id, ...doc.data() });
        });

        // Sort quizzes by upVote in descending order
        quizzesData.sort((a, b) => b.upVote - a.upVote);

        // Set the sorted quizzes data to the state
        setQuizzes(quizzesData);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div className="space-y-10">
      {quizzes.length === 0 ? (
        <p className="text-white font-semibold">No quizzes available.</p>
      ) : (
        quizzes.map((item) => (
          <div key={item.id}>
            <QuizTemplate item={item} />
          </div>
        ))
      )}
    </div>
  );
};

export default Page;
