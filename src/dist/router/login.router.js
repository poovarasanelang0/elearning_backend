"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Validators_1 = require("../middleware/Validators");
const checkAuth_1 = require("../middleware/checkAuth");
const login_controller_1 = require("../controller/login.controller");
const router = (0, express_1.Router)();
router.post('/', //for master login
checkAuth_1.basicAuthUser, (0, Validators_1.checkRequestBodyParams)('email'), login_controller_1.loginEmail);
exports.default = router;
//# sourceMappingURL=login.router.js.map