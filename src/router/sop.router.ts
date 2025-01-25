import { Router } from "express";
const router: Router = Router();
import { saveSop, getAllSop, updateSop, getSingleSop, deletedSop, getFilterSop } from "../controller/sop.controller";
import { basicAuthUser } from "../middleware/checkAuth";
import { checkSession } from "../utils/tokenManager";
import { checkQuery, checkRequestBodyParams } from "../middleware/Validators";

// Save SOP
router.post('/',
    basicAuthUser,
    checkSession,
    saveSop
);

// Get all SOPs
router.get('/',
    basicAuthUser,
    checkSession,
    getAllSop
);

// Update SOP
router.put('/',
    basicAuthUser,
    checkSession,
    checkRequestBodyParams('_id'),
    updateSop
);

// Get single SOP
router.get('/getSingleSop',
    basicAuthUser,
    checkSession,
    checkQuery('sopName'),
    getSingleSop
);

// Delete SOP
router.delete('/',
    basicAuthUser,
    checkSession,
    checkQuery('_id'),
    deletedSop
);

// Filter SOPs
router.put('/sopFilter',
    basicAuthUser,
    checkSession,
    checkRequestBodyParams('_id'),
    getFilterSop
);

export default router;
