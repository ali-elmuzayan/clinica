import mongoose from "mongoose"; 
import { env } from "./env.js"; 

const uri = env.mongoUri; 

async function connectDB() {
    try {
      // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4,
        connectTimeoutMS: 10000,
      });
      await mongoose.connection.db?.admin().command({ ping: 1 });
      console.log("✅ Connected to MongoDB successfully! 🚀\n");
    } catch (error) {
      console.error("❌ Error connecting to MongoDB: ", error, "\n");
      process.exit(1);
    }
}


export { connectDB };