"use client";

import { useState, useEffect } from "react";

type props = {
  category: string;
  number: number;
  question: string;
  answer: string;
  options: Array<string>;
};

const Question = ({ category, number, question, answer, options }: props) => {
  const [optionsArrayRandom, setOptionsArrayRandom] = useState<Array<string>>(
    []
  );

  function shuffleArray(array: Array<string>) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  const optionsArray: Array<string> = [];
  optionsArray.push(answer);
  for (let i = 0; i < options.length; i++) {
    optionsArray.push(options[i]);
  }

  useEffect(() => {
    shuffleArray(optionsArray);
    setOptionsArrayRandom(optionsArray);
  }, []);

  return (
    <li>
      <div className="flex flex-col justify-center my-5 px-2">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold" dangerouslySetInnerHTML={{__html:`${number}. ${question}`}}>
          </h1>
          <span className="hidden text-xs mid-sm:block ml-4 bg-slate-200 text-lighter-blue font-semibold py-1 px-2 rounded-lg">
            {category}
          </span>
        </div>

        <div className="my-2 flex flex-col justify-evenly">
          <ul>
            {optionsArrayRandom.map((option, idx) => (
              <li key={idx}>
                <input
                  type="radio"
                  name={`question${number}`}
                  value={option}
                  className="mr-2"
                />
                <p className="inline" dangerouslySetInnerHTML={{__html: `${option}`}}></p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
};

export default Question;
