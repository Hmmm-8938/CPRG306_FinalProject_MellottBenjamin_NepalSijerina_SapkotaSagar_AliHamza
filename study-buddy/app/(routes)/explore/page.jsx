"use client";
import React, { useState, useEffect } from "react";
import data from "../_data/quizData.json";
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
  const [shuffledData, setShuffledData] = useState(data);

  useEffect(() => {
    setShuffledData(shuffleArray(data));
  }, []);

  return (
    <div className="space-y-10">
      {shuffledData.map((item, i) => (
        <div key={i}>
          <QuizTemplate item={item} />
        </div>
      ))}
    </div>
  );
};

export default Page;
