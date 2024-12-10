"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../_utils/firebase";
import QuizTemplate from "../(components)/QuizTemplate";

// Wrap SearchResults with Suspense for handling client-side navigation hooks like useSearchParams
const SearchResults = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams(); // Get query params from the URL
  const queryParam = searchParams.get("query"); // Extract the query from the URL

  useEffect(() => {
    if (queryParam) {
      const fetchQuizzes = async () => {
        try {
          const quizCollectionRef = collection(db, "quizes");
          const querySnapshot = await getDocs(quizCollectionRef);
          const quizzesData = [];

          // Loop through the documents and filter them manually
          querySnapshot.forEach((doc) => {
            const data = doc.data();

            // Check if the title matches
            const titleMatches = data.title
              .toLowerCase()
              .includes(queryParam.toLowerCase());

            // Check if any of the quizInfo fields match the query
            const isRelated = data.quizInfo.some(
              (item) =>
                item.question
                  .toLowerCase()
                  .includes(queryParam.toLowerCase()) ||
                item.correctAnswer
                  .toLowerCase()
                  .includes(queryParam.toLowerCase()) ||
                item.explanation
                  .toLowerCase()
                  .includes(queryParam.toLowerCase())
            );

            // Add quiz if the title or any related field matches
            if (titleMatches || isRelated) {
              quizzesData.push({ id: doc.id, ...data });
            }
          });

          setQuizzes(quizzesData);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching quizzes:", error);
          setLoading(false);
        }
      };

      fetchQuizzes();
    }
  }, [queryParam]);

  return (
    <div className="space-y-10 p-4 text-white">
      {loading ? (
        <p>Loading quizzes...</p>
      ) : quizzes.length === 0 ? (
        <p>No quizzes found for &quot;{queryParam}&quot;</p>
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

// Wrapping the whole SearchResults component inside Suspense
const SearchResultsWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SearchResults />
  </Suspense>
);

export default SearchResultsWrapper;
