import Link from "next/link";

type quizDetailsStruct = {
  _id: string;
  __V: number;
  contestant: string;
  score: number;
  questions: Array<string>;
  answers: Array<string>;
  checkedOptions: Array<string>;
};

const QuizCard = ({ quizDetails }: { quizDetails: quizDetailsStruct }) => {
  return (
    <div className="col-span-12 xl:col-span-6 m-2 p-2 shadow-md hover:shadow-lg duration-100 ">
      <Link
        className="flex flex-col items-center"
        href={`/quiz-result/${quizDetails?._id}`}
      >
        <h1 className="text-sm sm:text-lg font-[500]">
          Quiz Id : {quizDetails?._id}
        </h1>
        <p className="text-sm font-[600]">
          Your Score : {quizDetails?.score} / 10
        </p>
        <p className="text-sm">Click To View Detailed Result -&gt; </p>
      </Link>
    </div>
  );
};

export default QuizCard;
