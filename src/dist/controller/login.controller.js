"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginEmail = void 0;
const express_validator_1 = require("express-validator");
const Encryption_1 = require("../helper/Encryption");
const master_model_1 = require("../models/master.model");
const user_model_1 = require("../models/user.model");
const TokenManager = require("../utils/tokenManager");
const ErrorMessage_1 = require("../helper/ErrorMessage");
const commonResponseHandler_1 = require("../helper/commonResponseHandler");
var activity = "Login";
let loginEmail = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            let { email, password } = req.body;
            const master = await master_model_1.Master.findOne({ $and: [{ email: email }, { isDeleted: false }] }, { email: 1, password: 1, name: 1, status: 1 });
            const user = await user_model_1.User.findOne({ $and: [{ email: email }, { isDeleted: false }] }, { email: 1, password: 1, name: 1, status: 1 });
            if (master) {
                const newHash = await (0, Encryption_1.decrypt)(master["password"]);
                if (master["status"] === 2) {
                    (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Login-Email', false, 499, {}, ErrorMessage_1.clientError.account.inActive);
                }
                else if (newHash != password) {
                    (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Login-Email', false, 403, {}, "Invalid Password !");
                }
                else {
                    const token = await TokenManager.CreateJWTToken({
                        id: master["_id"],
                        name: master["name"],
                        loginType: 'master'
                    });
                    const details = {};
                    details['_id'] = master._id;
                    details['email'] = master.email;
                    let finalResult = {};
                    finalResult["loginType"] = 'master';
                    finalResult["masterDetails"] = details;
                    finalResult["token"] = token;
                    (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Login-Email', true, 200, finalResult, ErrorMessage_1.clientError.success.loginSuccess);
                }
            }
            else if (user) {
                const newHash = await (0, Encryption_1.decrypt)(user["password"]);
                if (user["status"] === 2) {
                    (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Login-Email', false, 499, {}, ErrorMessage_1.clientError.account.inActive);
                }
                else if (newHash != password) {
                    (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Login-Email', false, 403, {}, "Invalid Password !");
                }
                else {
                    const token = await TokenManager.CreateJWTToken({
                        id: user["_id"],
                        name: user["name"],
                        loginType: 'user'
                    });
                    const details = {};
                    details['_id'] = user._id;
                    details['email'] = user.email;
                    let finalResult = {};
                    finalResult["loginType"] = 'user';
                    finalResult["userDetails"] = details;
                    finalResult["token"] = token;
                    (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Login-Email', true, 200, finalResult, ErrorMessage_1.clientError.success.loginSuccess);
                }
            }
            else {
                (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Login-Email', true, 422, {}, 'Invalid Email Id');
            }
        }
        catch (err) {
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Login-Email', false, 422, {}, ErrorMessage_1.errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
        }
    }
};
exports.loginEmail = loginEmail;
//# sourceMappingURL=login.controller.js.map