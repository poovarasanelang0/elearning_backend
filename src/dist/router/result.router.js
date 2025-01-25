"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const result_controller_1 = require("../controller/result.controller");
const checkAuth_1 = require("../middleware/checkAuth");
const tokenManager_1 = require("../utils/tokenManager");
const Validators_1 = require("../middleware/Validators");
router.post('/', //save Course
checkAuth_1.basicAuthUser, tokenManager_1.checkSession, result_controller_1.createResult);
router.get('/get-result', checkAuth_1.basicAuthUser, tokenManager_1.checkSession, result_controller_1.getResult);
router.get('/getPassCount', checkAuth_1.basicAuthUser, tokenManager_1.checkSession, result_controller_1.getPassCounts);
router.get('/getCourseQuestion', (0, Validators_1.checkQuery)('userId'), result_controller_1.getUserResult);
router.get('/getAllResults', checkAuth_1.basicAuthUser, tokenManager_1.checkSession, result_controller_1.getAllResults);
exports.default = router;
//# sourceMappingURL=result.router.js.map