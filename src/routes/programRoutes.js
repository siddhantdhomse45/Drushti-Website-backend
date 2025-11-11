import { underGrad } from "../controllers/undergraduateController.js"
import {Router} from "express";
import upload from "../middleware/upload.js";
const programrouter = Router()


programrouter.post('/addprogram',upload.single("document"),underGrad)


export default programrouter;