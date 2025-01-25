import {Router} from "express";
const router:Router = Router();
import { createResult, getResult ,getAllResults , getPassCounts ,getUserResult} from "../controller/result.controller";
import {basicAuthUser} from "../middleware/checkAuth";
import {checkSession} from "../utils/tokenManager";
import { checkQuery,checkRequestBodyParams } from "../middleware/Validators";

router.post('/', //save Course
    basicAuthUser,
    checkSession,
    createResult  
)

router.get('/get-result',  basicAuthUser,
checkSession, getResult);

router.get('/getPassCount',  basicAuthUser,
checkSession, getPassCounts);

router.get('/getCourseQuestion',             
checkQuery('userId'),
getUserResult   
);
router.get('/getAllResults',  basicAuthUser,
checkSession, getAllResults);

export default router;