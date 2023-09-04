"use client";

import axios from "axios";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useEffect, useState } from "react";
import Loader from "@/app/components/Loader";

type quizDetailsStruct = {
  _id: string;
  __V: number;
  contestant: string;
  score: number;
  questions: Array<string>;
  answers: Array<string>;
  checkedOptions: Array<string>;
};

const QuizResult = ({ params }: { params: Params }) => {
  const quizId = params.id;
  const [isLoading, setIsLoading] = useState(true);
  const [quizDetails, setQuizDetails] = useState<quizDetailsStruct>();

  useEffect(() => {
    const fetchQuiz = async () => {
      const quiz = await axios.get(`/api/quiz-details`, {
        params: {
          id: quizId,
        },
      });
      setQuizDetails(quiz.data);
      setIsLoading(false);
    };

    fetchQuiz();
  }, []);

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <div>
        {quizDetails?.questions.map((ques, idx) => (
          <div key={idx} className="duration-200 ease-linear hover:bg-slate-200 p-4 border-b-2 border-gray-300">
            <h1
              className="text-base md:text-lg font-semibold"
              dangerouslySetInnerHTML={{ __html: `${idx + 1}) ${ques}` }}
            ></h1>
            <p
              className="mt-4"
              dangerouslySetInnerHTML={{
                __html: `Correct Answer : ${quizDetails?.answers[idx]}`,
              }}
            ></p>
            <p
              className={`${
                quizDetails?.answers[idx] === quizDetails?.checkedOptions[idx]
                  ? "text-green-500"
                  : "text-red-500"
              }`}
              dangerouslySetInnerHTML={{
                __html: `Your Answer : ${quizDetails?.checkedOptions[idx]}`,
              }}
            ></p>
          </div>
        ))}

        <h1 className="p-4 text-2xl font-bold">
          Your Score : {quizDetails?.score} / 10
        </h1>
      </div>
    );
  }
};

export default QuizResult;
