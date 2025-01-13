"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveMasters = void 0;
const express_validator_1 = require("express-validator");
const ErrorMessage_1 = require("../helper/ErrorMessage");
const commonResponseHandler_1 = require("../helper/commonResponseHandler");
const master_model_1 = require("../models/master.model");
const TokenManager = require("../utils/tokenManager");
const Encryption_1 = require("../helper/Encryption");
var activity = "Masters";
/**
 * @author Balaji Murahari
 * @date   27-10-2023
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to save masters
 */
let saveMasters = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            const mastersData = await master_model_1.Master.findOne({ $and: [{ isDeleted: false }, { email: req.body.email }] });
            if (!mastersData) {
                req.body.password = await (0, Encryption_1.encrypt)(req.body.password);
                const masterDetails = req.body;
                masterDetails.createdOn = new Date();
                masterDetails.createdBy = masterDetails.name;
                let date = new Date();
                // masterDetails.date = date?.getDate();
                // masterDetails.month = date?.getMonth() + 1;
                // masterDetails.year = date?.getFullYear()
                const createData = new master_model_1.Master(masterDetails);
                let insertData = await createData.save();
                const token = await TokenManager.CreateJWTToken({
                    id: insertData["_id"],
                    name: insertData["name"],
                });
                const result = {};
                result['_id'] = insertData._id;
                result['masterName'] = insertData.name;
                let finalResult = {};
                finalResult["loginType"] = 'master';
                finalResult["masterDetails"] = result;
                finalResult["token"] = token;
                (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Save-master', true, 200, finalResult, ErrorMessage_1.clientError.success.registerSuccessfully);
            }
            else {
                (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Save-master', true, 422, {}, 'Email already registered');
            }
        }
        catch (err) {
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Save-master', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
        }
    }
    else {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Save-master', false, 422, {}, ErrorMessage_1.errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};
exports.saveMasters = saveMasters;
//# sourceMappingURL=master.controller.js.map