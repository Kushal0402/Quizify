import { connectToDb } from "@/app/utils/databaseConnection";
import QuizHistory from "@/app/models/QuizHistory";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const quizId = req.nextUrl.searchParams.get('id');
  try {
    await connectToDb();
    const quizToFetch = await QuizHistory.findOne({
      _id: quizId,
    });
  return NextResponse.json(quizToFetch);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: `${err}` });
  }

}
