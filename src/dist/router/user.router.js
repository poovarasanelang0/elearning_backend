"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const Validators_1 = require("../middleware/Validators");
const checkAuth_1 = require("../middleware/checkAuth");
const tokenManager_1 = require("../utils/tokenManager");
const router = (0, express_1.Router)();
router.post('/', //create masters
checkAuth_1.basicAuthUser, (0, Validators_1.checkRequestBodyParams)('email'), user_controller_1.saveUsers);
router.get('/', //get all 
checkAuth_1.basicAuthUser, tokenManager_1.checkSession, user_controller_1.getAllCourse);
router.put('/', //update Course
checkAuth_1.basicAuthUser, tokenManager_1.checkSession, (0, Validators_1.checkRequestBodyParams)('_id'), user_controller_1.updateCourse);
router.get('/getSingleUser', //get single user
checkAuth_1.basicAuthUser, tokenManager_1.checkSession, (0, Validators_1.checkQuery)('_id'), user_controller_1.getSingleCourse);
router.delete('/', //delete users',
checkAuth_1.basicAuthUser, tokenManager_1.checkSession, (0, Validators_1.checkQuery)('_id'), user_controller_1.deletedCourse);
router.put('/questionFilter', //get filter for users',
checkAuth_1.basicAuthUser, tokenManager_1.checkSession, (0, Validators_1.checkRequestBodyParams)('_id'), user_controller_1.getFilterCourse);
exports.default = router;
//# sourceMappingURL=user.router.js.map