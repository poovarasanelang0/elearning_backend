"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const sop_controller_1 = require("../controller/sop.controller");
const checkAuth_1 = require("../middleware/checkAuth");
const tokenManager_1 = require("../utils/tokenManager");
const Validators_1 = require("../middleware/Validators");
// Save SOP
router.post('/', checkAuth_1.basicAuthUser, tokenManager_1.checkSession, sop_controller_1.saveSop);
// Get all SOPs
router.get('/', checkAuth_1.basicAuthUser, tokenManager_1.checkSession, sop_controller_1.getAllSop);
// Update SOP
router.put('/', checkAuth_1.basicAuthUser, tokenManager_1.checkSession, (0, Validators_1.checkRequestBodyParams)('_id'), sop_controller_1.updateSop);
// Get single SOP
router.get('/getSingleSop', checkAuth_1.basicAuthUser, tokenManager_1.checkSession, (0, Validators_1.checkQuery)('sopName'), sop_controller_1.getSingleSop);
// Delete SOP
router.delete('/', checkAuth_1.basicAuthUser, tokenManager_1.checkSession, (0, Validators_1.checkQuery)('_id'), sop_controller_1.deletedSop);
// Filter SOPs
router.put('/sopFilter', checkAuth_1.basicAuthUser, tokenManager_1.checkSession, (0, Validators_1.checkRequestBodyParams)('_id'), sop_controller_1.getFilterSop);
exports.default = router;
//# sourceMappingURL=sop.router.js.map