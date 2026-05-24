import express from "express"; 
import cors from "cors"; 

const createApp = () => {
    const app = express();  

    app.use(cors()); 
    app.use(express.json()); 

    // Routes
    app.get("/", (req, res) => {
        res.send("Hello World");
    });

    
    return app;
}

export default createApp;