import createApp from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";

const startServer = async () => {
    //connect to database
    await connectDB(); 

    //create app
    const app = createApp(); 

    //start server
    app.listen(env.port, () => {
        console.log(`Server is running on port ${env.port} in ${env.nodeEnv} mode`);
    });
};

startServer();