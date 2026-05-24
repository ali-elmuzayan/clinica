import express from "express"; 
import cors from "cors"; 
import V1Router from "./routes/v1/index.js";

const createApp = () => {
    const app = express();  

    app.use(cors()); 
    app.use(express.json()); 

    // Routes
    app.use("/api/v1", V1Router);

    
    return app;
}

export default createApp;