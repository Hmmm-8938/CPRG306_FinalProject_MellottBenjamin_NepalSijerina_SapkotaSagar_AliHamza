"use client";
import React, { useState } from "react";
import QuizTemplate from "../(components)/QuizTemplate";
import data from "../_data/quizData.json";

const page = () => {
  return (
    <>
      <div className="space-y-10">
        {data.map((item, i) => (
          <div key={i}>
            <QuizTemplate item={item} />
          </div>
        ))}
      </div>
    </>
  );
};

export default page;
