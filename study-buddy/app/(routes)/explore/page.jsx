"use client";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../_utils/firebase";
import QuizTemplate from "../(components)/QuizTemplate";

// Fisher-Yates Shuffle Function
const shuffleArray = (array) => {
  let shuffledArray = [...array]; // Create a copy of the array to avoid mutation
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
  }
  return shuffledArray;
};

const Page = () => {
  const [shuffledData, setShuffledData] = useState([]); // State to store shuffled data

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const quizCollectionRef = collection(db, "quizes"); // Reference to Firestore 'quizes' collection
        const querySnapshot = await getDocs(quizCollectionRef); // Fetch all quizzes
        const quizzesData = [];

        querySnapshot.forEach((doc) => {
          quizzesData.push({ id: doc.id, ...doc.data() }); // Push quiz data to array
        });

        // Shuffle the quiz data after fetching
        setShuffledData(shuffleArray(quizzesData));
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="space-y-10">
      {shuffledData.length === 0 ? (
        <p>No quizzes available.</p> // Display message if no quizzes are available
      ) : (
        shuffledData.map((item, i) => (
          <div key={item.id}>
            <QuizTemplate item={item} />
          </div>
        ))
      )}
    </div>
  );
};

export default Page;
