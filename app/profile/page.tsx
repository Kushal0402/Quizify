"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Loader from "../components/Loader";
import QuizCard from "../components/QuizCard";

type quizDetailsStruct = {
  _id: string;
  __V: number;
  contestant: string;
  score: number;
  questions: Array<string>;
  answers: Array<string>;
  checkedOptions: Array<string>;
};

const Profile = () => {
  const { data: session } = useSession();
  const [quizData, setQuizData] = useState<Array<quizDetailsStruct>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuizData = async () => {
      const res = await axios.get("/api/quiz", {
        params: {
          //@ts-ignore
          id: session?.user?.id,
        },
      });

      setQuizData(res?.data);
      setIsLoading(false);
    };

    setTimeout(fetchQuizData, 100);
  }, []);

  if (isLoading) {
    return <Loader />;
  } else if(!isLoading && session) {
    return (
      <div className="flex flex-col gap-4">
        <h1 className="mx-auto my-6 text-4xl sm:text-6xl font-[900] text-dark-blue">{session?.user?.name}</h1>
        <div className="grid grid-cols-12 gap-4">
        {
            quizData.map((quiz, idx) => (
                <QuizCard key={idx} quizDetails={quiz}/>
            ))
        }
        </div>
      </div>
    );
  }

  else {
    return <div className="flex justify-center mt-20 text-4xl font-[900]"><p>You need to login to view this page!!!</p></div>
  }
};

export default Profile;
