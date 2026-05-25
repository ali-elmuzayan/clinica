import express, { NextFunction } from "express"; 
import cors from "cors"; 
import helmet from "helmet";
import morgan from "morgan";

import { AppError, errorHandler } from "./middleware/errorHandler.js";
import healthRouter from "./routes/v1/health.router.js";
import V1Router from "./routes/v1/index.js";

const createApp = () => {
    const app = express();  

    app.use(cors()); 
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(express.json()); 

    // Routes
    app.use("/api/v1", V1Router);
    app.use("/health", healthRouter);

    app.use(    (req: express.Request, _res: express.Response, next: NextFunction) => {
        next(new AppError(404, `Route not found: ${req.path}`));
    });

    app.use(errorHandler); 

    
    return app;
}

export default createApp;