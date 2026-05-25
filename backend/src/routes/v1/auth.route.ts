import { Router } from "express"; 
import { login, logout, me, refreshToken, register, resetPassword, verifyToken } from "../../controllers/auth.controller.js"; 


const router = Router(); 


router.post("/register", register); 
router.post("/login", login); 
router.post("/logout", logout); 
router.post("/me", me); 
router.post("/refresh-token", refreshToken); 
router.post("/verify-token", verifyToken); 
router.post("/reset-password", resetPassword); 

export default router; 