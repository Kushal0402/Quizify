import mongoose from "mongoose";

let isConnected = false;
export const connectToDb = async () => {
  
  if (!isConnected) {
    try {
      mongoose.set('strictQuery', true);
      await mongoose.connect(process.env.MONGODB_CONNECTION_URI as string, {
        dbName: "Quiz-History-Records",
      });

      isConnected = true;

      console.log('MongoDB connected');
    } catch (err) {
      console.error(err);
    }
  }

  else {
    console.log('MongoDB already connected');
  }

};
