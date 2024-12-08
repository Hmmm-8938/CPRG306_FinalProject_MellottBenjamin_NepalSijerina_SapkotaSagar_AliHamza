import React from "react";
import data from "../_data/quizData.json";
import QuizTemplate from "../(components)/QuizTemplate";

const page = () => {
  const sortedQuizzes = data.sort((a, b) => b.upVote - a.upVote);
  return (
    <div className="space-y-10">
      {sortedQuizzes.map((item, i) => (
        <div key={i}>
          <QuizTemplate item={item} />
        </div>
      ))}
    </div>
  );
};

export default page;
