import express from "express"; 
import cors from "cors"; 
import V1Router from "./routes/v1/index.js";
import healthRouter from "./routes/v1/health.router.js";

const createApp = () => {
    const app = express();  

    app.use(cors()); 
    app.use(express.json()); 

    // Routes
    app.use("/api/v1", V1Router);
    app.use("/health", healthRouter);

    
    return app;
}

export default createApp;