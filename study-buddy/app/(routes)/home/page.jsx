"use client";
import React, { useState, useEffect } from "react";
import QuizTemplate from "../(components)/QuizTemplate"; // Import the QuizTemplate component
import { collection, getDocs } from "firebase/firestore";
import { db } from "../_utils/firebase";

const Page = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const quizCollectionRef = collection(db, "quizes"); // Reference to Firestore 'quizes' collection
        const querySnapshot = await getDocs(quizCollectionRef); // Fetch all quizzes
        const quizzesData = [];

        querySnapshot.forEach((doc) => {
          quizzesData.push({ id: doc.id, ...doc.data() });
          // Push the quiz data to the array
        });

        // Sort quizzes by the createdAt field in descending order (recent first)
        quizzesData.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);

        setQuizzes(quizzesData); // Update state with sorted quizzes
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <>
      <div className="space-y-10">
        {quizzes?.length === 0 ? (
          <p>No quizzes available.</p>
        ) : (
          quizzes?.map((item, i) => (
            <div key={item.id}>
              <QuizTemplate item={item} />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Page; // Ensure that the component is exported as `Page`
