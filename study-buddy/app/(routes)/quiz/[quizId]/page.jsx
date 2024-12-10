"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // To get the quizId from the URL
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../_utils/firebase"; // Adjust this path to your Firebase config

const QuizPage = () => {
  const params = useParams();
  const { quizId } = params; // Get the quizId from the URL parameter
  console.log(quizId);
  const [quizData, setQuizData] = useState(null); // Store the fetched quiz data
  const [answers, setAnswers] = useState({}); // Store the user's answers
  const [score, setScore] = useState(null); // Store the final score after submission
  const [submission, setSubmission] = useState(false);

  // Fetch quiz data from Firebase when the quizId is available
  useEffect(() => {
    if (quizId) {
      const fetchQuizData = async () => {
        try {
          const docRef = doc(db, "quizes", quizId); // Reference to the quiz document in Firestore
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setQuizData(docSnap.data()); // Set quiz data to state
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching quiz:", error);
        }
      };

      fetchQuizData();
    }
  }, [quizId]); // Run effect when quizId changes

  // Handle answer change
  const handleAnswerChange = (questionId, selectedAnswer) => {
    setAnswers({
      ...answers,
      [questionId]: selectedAnswer,
    });
  };

  // Calculate score when the user submits the quiz
  const handleSubmit = () => {
    if (!quizData) return;

    let correctAnswersCount = 0;

    quizData.quizInfo.forEach((question) => {
      if (answers[question.question] === question.correctAnswer) {
        correctAnswersCount++;
      }
    });
    setSubmission(true);
    setScore(correctAnswersCount); // Update the score based on correct answers
  };

  if (!quizData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-6 text-white">
      <h1 className="text-2xl font-semibold">{quizData.title}</h1>
      <p className="text-sm text-gray-500">Author: {quizData.author}</p>

      <div className="mt-6 space-y-6">
        {quizData.quizInfo.map((question, index) => (
          <div key={index} className="space-y-2">
            <p className="font-semibold">{question.question}</p>
            <div className="space-y-1">
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center gap-2">
                  <input
                    type="radio"
                    id={`${question.question}-${optionIndex}`}
                    name={question.question}
                    value={option}
                    onChange={() =>
                      handleAnswerChange(question.question, option)
                    }
                    checked={answers[question.question] === option}
                    className="text-blue-500"
                  />
                  <label htmlFor={`${question.question}-${optionIndex}`}>
                    {option}
                  </label>
                </div>
              ))}
            </div>
            <p className="text-sm mt-2 text-gray-400">
              Correct Answer: {submission ? question.correctAnswer : ""}
            </p>
            <p className="text-sm text-gray-400">
              Explanation: {submission ? question.explanation : ""}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
      >
        Submit Quiz
      </button>
      <button
        onClick={() => window.location.reload()}
        className="mt-6 ml-5 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
      >
        Reset
      </button>

      {score !== null && (
        <div className="mt-4">
          <p className="text-lg font-semibold">
            Your Score: {score} / {quizData.quizInfo.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
