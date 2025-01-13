"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const master_controller_1 = require("../controller/master.controller");
const Validators_1 = require("../middleware/Validators");
const checkAuth_1 = require("../middleware/checkAuth");
const router = (0, express_1.Router)();
router.post('/', //create masters
checkAuth_1.basicAuthUser, (0, Validators_1.checkRequestBodyParams)('email'), master_controller_1.saveMasters);
exports.default = router;
//# sourceMappingURL=master.router.js.map