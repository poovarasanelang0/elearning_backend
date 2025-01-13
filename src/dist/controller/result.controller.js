"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResult = void 0;
const result_model_1 = require("../models/result.model");
const express_validator_1 = require("express-validator");
const commonResponseHandler_1 = require("../helper/commonResponseHandler");
const ErrorMessage_1 = require("../helper/ErrorMessage");
var activity = "Result";
// Controller function to save answers
let createResult = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            // Check if a Result with the same title already exists for the same university
            const existingResult = await result_model_1.Result.findOne({
                courseName: req.body.courseName,
                userName: req.body.userName
            });
            if (!existingResult) {
                const ResultDetails = req.body;
                const newResult = new result_model_1.Result(ResultDetails);
                let insertedData = await newResult.save();
                // Respond with success
                (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Create-Result', true, 200, insertedData, ErrorMessage_1.clientError.success.savedSuccessfully);
            }
            else {
                // Respond with error if Result title is already registered for the same university
                (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Create-Result', true, 422, {}, 'Result Title Already Registered For Same University');
            }
        }
        catch (err) {
            console.log(err);
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Create-Result', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
        }
    }
    else {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Create-Result', false, 422, {}, ErrorMessage_1.errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};
exports.createResult = createResult;
//# sourceMappingURL=result.controller.js.map