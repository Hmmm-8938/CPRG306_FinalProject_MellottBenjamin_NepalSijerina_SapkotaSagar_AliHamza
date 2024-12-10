"use client";
import React, { useState, useEffect } from "react";
import QuizTemplate from "../(components)/QuizTemplate"; // Import the QuizTemplate component
import { collection, getDocs } from "firebase/firestore";
import { db } from "../_utils/firebase";

const page = () => {
  const [quizzes, setQuizzes] = useState([]); // State to store fetched quizzes

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const quizCollectionRef = collection(db, "quizes"); // Reference to Firestore 'quizes' collection
        const querySnapshot = await getDocs(quizCollectionRef); // Fetch all quizzes
        const quizzesData = [];

        querySnapshot.forEach((doc) => {
          quizzesData.push({ id: doc.id, ...doc.data() }); // Push the quiz data to the array
        });
        setQuizzes(quizzesData); // Update state with fetched quizzes
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <>
      <div className="space-y-10">
        {quizzes.length === 0 ? (
          <p>No quizzes available.</p> // Display a message if no quizzes are available
        ) : (
          quizzes.map((item, i) => (
            <div key={item.id}>
              <QuizTemplate item={item} />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default page;
