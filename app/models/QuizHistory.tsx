import { model, models, Schema } from "mongoose";

const QuizHistorySchema = new Schema({
    contestant: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    score: {
        type: Number,
        required: true
    },
    questions: [
        {
            type: String,
            required:true,
        }
    ],
    answers: [
        {
            type: String,
            required: true,
        }
    ],
    checkedOptions: [
        {
            type: String,
        }
    ]
})

const QuizHistory = models.QuizHistory || model('QuizHistory', QuizHistorySchema); 

export default QuizHistory;