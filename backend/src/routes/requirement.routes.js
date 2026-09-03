import express from "express"
import requirementControllers from "../controllers/requirement.controllers.js"
import { isAuth } from "../middleware/isAuth.js"

let router = express.Router()

router.post("/data",isAuth,requirementControllers.formData)

router.delete("/delete",isAuth,requirementControllers.DeleteData)

router.get("/get-all-user",isAuth,requirementControllers.getUser)

export default router