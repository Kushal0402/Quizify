import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
    name: {
     type: String,
     required: true,
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
    }
})

const User = models.User || model('User', UserSchema);

export default User;