import React from "react";
import { IoArrowUpCircle } from "react-icons/io5";
import { IoArrowDownCircle } from "react-icons/io5";

const QuizTemplate = ({ item }) => {
  return (
    <div className="bg-[#403179] shadow-lg hover:bg-[#3c2c74] transition-all duration-300 text-white py-4 px-5 rounded-xl space-y-4">
      <div>
        <h1 className="font-semibold text-xl cursor-pointer  hover:underline ">
          {item.title}
        </h1>
        <h5 className="text-xs cursor-pointer hover:underline ">
          Author: {item.author}
        </h5>
      </div>

      <p className="text-sm">
        Test your knowledge and sharpen your understanding with this interactive
        quiz! Designed to help you review key concepts and reinforce learning,
        this quiz is a fun and effective way to prepare for exams or refresh
        your memory. Challenge yourself and see how much you've mastered
      </p>
      <div className="flex gap-2">
        <div className="flex items-center gap-1">
          <IoArrowUpCircle />
          <span>{item.upVote}</span>
        </div>
        <div className="flex items-center gap-1">
          <IoArrowDownCircle />
          <span>{item.downVote}</span>
        </div>
      </div>
    </div>
  );
};

export default QuizTemplate;
