import { underGrad,getUnderGradPrograms , deleteUnderGradProgram} from "../controllers/undergraduateController.js"
import {Router} from "express";
import upload from "../middleware/upload.js";
const programrouter = Router()


programrouter.post('/addprogram',upload.single("document"),underGrad)
programrouter.get('/getprograms',getUnderGradPrograms)
programrouter.delete('/deleteprogram/:programId/:courseId',deleteUnderGradProgram)


export default programrouter;