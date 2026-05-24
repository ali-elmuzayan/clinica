import { Router } from "express"; 
import authRouter from "./auth.router.js";


const V1Router = Router(); 


V1Router.use("/auth", authRouter); 

export default V1Router; 