"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const result_controller_1 = require("../controller/result.controller");
const checkAuth_1 = require("../middleware/checkAuth");
const tokenManager_1 = require("../utils/tokenManager");
router.post('/', //save Course
checkAuth_1.basicAuthUser, tokenManager_1.checkSession, result_controller_1.createResult);
exports.default = router;
//# sourceMappingURL=result.router.js.map