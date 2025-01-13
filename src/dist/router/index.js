"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const master_router_1 = require("./master.router");
const login_router_1 = require("./login.router");
const course_router_1 = require("./course.router");
const questions_router_1 = require("./questions.router");
const user_router_1 = require("./user.router");
const result_router_1 = require("./result.router");
router.use('/master', master_router_1.default);
router.use('/login', login_router_1.default);
router.use('/user', user_router_1.default);
router.use('/course', course_router_1.default);
router.use('/question', questions_router_1.default);
router.use('/result', result_router_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map