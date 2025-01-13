"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const course_controller_1 = require("../controller/course.controller");
const checkAuth_1 = require("../middleware/checkAuth");
const tokenManager_1 = require("../utils/tokenManager");
const Validators_1 = require("../middleware/Validators");
router.post('/', //save Course
checkAuth_1.basicAuthUser, tokenManager_1.checkSession, course_controller_1.saveCourse);
router.get('/', //get all 
checkAuth_1.basicAuthUser, tokenManager_1.checkSession, course_controller_1.getAllCourse);
router.put('/', //update Course
checkAuth_1.basicAuthUser, tokenManager_1.checkSession, (0, Validators_1.checkRequestBodyParams)('_id'), course_controller_1.updateCourse);
router.get('/getSingleCourse', //get single user
checkAuth_1.basicAuthUser, tokenManager_1.checkSession, (0, Validators_1.checkQuery)('_id'), course_controller_1.getSingleCourse);
router.delete('/', //delete users',
checkAuth_1.basicAuthUser, tokenManager_1.checkSession, (0, Validators_1.checkQuery)('_id'), course_controller_1.deletedCourse);
router.put('/userFilter', //get filter for users',
checkAuth_1.basicAuthUser, tokenManager_1.checkSession, (0, Validators_1.checkRequestBodyParams)('_id'), course_controller_1.getFilterCourse);
exports.default = router;
//# sourceMappingURL=course.router.js.map