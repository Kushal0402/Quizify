import { connectToDb } from "@/app/utils/databaseConnection";
import QuizHistory from "@/app/models/QuizHistory";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const userId = req.nextUrl.searchParams.get("id");

  try {
    await connectToDb();

    const response = await QuizHistory.find({
      contestant: userId,
    });

    return NextResponse.json(response);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error Encountered" });
  }
};
