import express from "express"
import authControllers from "../controllers/auth.controllers.js"


let router = express.Router()

// login api 
router.post("/login",authControllers.login)

// signup api 
router.post("/signup",authControllers.signup)

// get me api 
router.get("/get-me",authControllers.getMe)

// logout
router.get("/logout",authControllers.logout)

export default router