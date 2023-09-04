"use client";

import Link from "next/link";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useState } from "react";
import { relative } from "path";
import QuizResult from "./quiz-result/[id]/page";

export default function Home() {
  const [isMouseOver, setIsMouseOver] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-4 justify-center items-center mt-20 mx-6 pb-6 text-center border-b-2 border-gray-200">
        <h1 className="primary_heading">Welcome to Quizify!</h1>
        <p className="text-lg sm:text-xl font-semibold text-lighter-blue">
          Test your knowledge, record your scores and analyze your
          performances...
        </p>
      </div>

      <div className="flex flex-col gap-4 items-center text-center mt-20">
        <h1 className="primary_heading">Ready for your first challenge?</h1>
        <Link href="/quiz">
          <button
            onMouseOver={() => setIsMouseOver(true)}
            onMouseOut={() => setIsMouseOver(false)}
            className="button flex items-center justify-center relative hover:text-white"
          >
            <p className="mr-2 text-lg sm:text-xl font-semibold">Click here</p>
            <BsFillArrowRightCircleFill
              style={{
                opacity: isMouseOver ? "1" : "0",
                scale: isMouseOver ? '1' : '0',
                color: 'white',
                transition: '0.2s ease',
              }}
            />
          </button>
        </Link>
      </div>
    </>
  );
}
