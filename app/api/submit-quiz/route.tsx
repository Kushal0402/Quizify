import { connectToDb } from "@/app/utils/databaseConnection";
import QuizHistory from "@/app/models/QuizHistory";
import { NextRequest, NextResponse } from "next/server";

import { ObjectId } from "mongodb";

export const POST = async (req: NextRequest) => {
  try {
    await connectToDb();
    
    const body = await req.json();

    const newQuiz = new QuizHistory({
      contestant: new ObjectId(body.contestant),
      score: body.score,
      questions: body.questions,
      answers: body.answers,
      checkedOptions: body.checkedOptions,
    });

    const res = await newQuiz.save();

    return NextResponse.json({quizResult: res});
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: `${err}`});
  } 
};
