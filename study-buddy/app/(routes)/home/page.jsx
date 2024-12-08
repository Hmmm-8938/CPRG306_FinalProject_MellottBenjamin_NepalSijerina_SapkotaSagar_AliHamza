import React from "react";
import QuizTemplate from "./(components)/QuizTemplate";

const page = () => {
  const quizzes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const newQuiz = [
    {
      author: "Sagar",
      title: "Data Structure and Algorithms Quiz",
      description:
        "Test your knowledge and sharpen your understanding with this interactive quiz! Designed to help you review key concepts and reinforce learning, this quiz is a fun and effective way to prepare for exams or refresh your memory. Challenge yourself and see how much you've mastered",
      upVote: "5",
      downVote: "2",
    },
    {
      author: "Benjamin",
      title: "Web Development Props Handling Quizzes",
      description:
        "Test your knowledge and sharpen your understanding with this interactive quiz! Designed to help you review key concepts and reinforce learning, this quiz is a fun and effective way to prepare for exams or refresh your memory. Challenge yourself and see how much you've mastered",
      upVote: "10",
      downVote: "3",
    },
    {
      author: "Sijerina",
      title: "Software Analysis Phase 1 Project Analysis Quiz",
      description:
        "Test your knowledge and sharpen your understanding with this interactive quiz! Designed to help you review key concepts and reinforce learning, this quiz is a fun and effective way to prepare for exams or refresh your memory. Challenge yourself and see how much you've mastered",
      upVote: "8",
      downVote: "1",
    },
  ];
  return (
    <>
      <div className="space-y-10">
        {newQuiz.map((item, i) => (
          <div key={i}>
            <QuizTemplate item={item} />
          </div>
        ))}
      </div>
    </>
  );
};

export default page;
