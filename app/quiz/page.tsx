"use client";

import { useState, useEffect, FormEvent } from "react";
import Loader from "../components/Loader";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import axios from "axios";
import Question from "../components/Question";

type questionsArrayType = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: Array<string>;
};
const page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();
  const [questions, setQuestions] = useState<Array<questionsArrayType>>([]);
  const [correctAnswers, setCorrectAnswers] = useState<Array<string>>([]);
  const [questionArray, setQuestionArray] = useState<Array<string>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getQuestions = async () => {
      const res = await axios.get(
        "https://opentdb.com/api.php?amount=10&type=multiple"
      );

      const questionsResponse = res?.data?.results;

      const questionsArray = questionsResponse.map(
        (ques: questionsArrayType) => ques?.question
      );

      const correctAnsArray = questionsResponse.map(
        (ques: questionsArrayType) => ques?.correct_answer
      );

      setQuestions(questionsResponse);
      setCorrectAnswers(correctAnsArray);
      setQuestionArray(questionsArray);
      
      setIsLoading(false);
    };

    getQuestions();
  }, []);

  const handleFormSubmit = async (e: FormEvent) => {
    
    e.preventDefault();
    setIsSubmitting(true);
    let score: number = 0;
    const checkedOptionsArray: Array<string> = [];
    
    for (let i = 0; i < questions.length; i++) {
      let notChecked : number = 0;
      let options = document.getElementsByName("question" + (i + 1).toString());
      
      for (let j = 0; j < options.length; j++) {
        //@ts-ignore
        if (options[j].checked) {
          //@ts-ignore
          if (options[j].value === questions[i].correct_answer) {
            score += 1;
          }
          //@ts-ignore
          checkedOptionsArray.push(options[j].value);
        }
        else {
          notChecked += 1;
        }
      }

      if(notChecked === options.length) {
        checkedOptionsArray.push('');
      }

    }

    try {
      const response = await axios.post("/api/submit-quiz", {
        //@ts-ignore
        contestant: session?.user?.id,
        score,
        questions: questionArray,
        answers: correctAnswers,
        checkedOptions: checkedOptionsArray,
      });
      
      router.push(`/quiz-result/${response.data.quizResult._id}`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
   
  };

  if (session?.user) {
    if (isLoading) {
      return <Loader />;
    } else {
      return (
        <>
          <form
            className="p-4 bg-gray-100"
            onSubmit={(e) => handleFormSubmit(e)}
          >
            <ul>
              {questions.map((ques, idx) => (
                <Question
                  key={idx}
                  category={ques?.category}
                  number={idx + 1}
                  question={ques?.question}
                  answer={ques?.correct_answer}
                  options={ques?.incorrect_answers}
                />
              ))}
            </ul>

            <button
              type="submit"
              className= 'mx-2 rounded-lg border-2 border-semi-dark-blue text-semi-dark-blue font-bold p-2 ease duration-200 hover:bg-semi-dark-blue hover:text-white'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting' : 'Submit'}
            </button>
          </form>
        </>
      );
    }
  } else {
    return (
      <h1 className="text-2xl font-bold text-center mt-20">
        You need to login to view this page!!!
      </h1>
    );
  }
};

export default page;
