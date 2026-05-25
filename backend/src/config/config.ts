import { Pool } from "pg";
import { env } from "./env.js"; 



export const db = new Pool({
    host: env.dbHost,
    port: env.dbPort,
    user: env.dbUser,
    password: env.dbPassword,
    database: env.dbName,
})


const connectDB = async () => {
    try {
        await db.connect(); 
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed", error);
        process.exit(1);
    }
}

export { connectDB };