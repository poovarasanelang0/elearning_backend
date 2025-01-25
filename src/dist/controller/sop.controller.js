"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilterSop = exports.deletedSop = exports.getSingleSop = exports.updateSop = exports.getAllSop = exports.saveSop = void 0;
const sop_modal_1 = require("../models/sop.modal");
const commonResponseHandler_1 = require("../helper/commonResponseHandler");
const ErrorMessage_1 = require("../helper/ErrorMessage");
const express_validator_1 = require("express-validator");
var activity = "Sop";
let saveSop = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            const sopData = req.body;
            // Validate fields
            if (!sopData.sopName) {
                throw new Error("SOP name is required.");
            }
            const newSop = new sop_modal_1.Sop(sopData);
            const savedSop = await newSop.save();
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Save-Sop', true, 200, savedSop, ErrorMessage_1.clientError.success.savedSuccessfully);
        }
        catch (err) {
            console.error("Error saving SOP:", err);
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Save-Sop', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
        }
    }
    else {
        console.warn("Validation errors:", errors.mapped());
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Save-Sop', false, 422, {}, ErrorMessage_1.errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};
exports.saveSop = saveSop;
let getAllSop = async (req, res, next) => {
    try {
        const data = await sop_modal_1.Sop.find({ isDeleted: false });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-1', 'GetAll-Sop', true, 200, data, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'GetAll-Sop', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getAllSop = getAllSop;
let updateSop = async (req, res, next) => {
    try {
        const updateData = req.body;
        const updatedSop = await sop_modal_1.Sop.findByIdAndUpdate({ _id: req.body._id }, {
            $set: {
                sopName: updateData.sopName,
                pdfurl: updateData.pdfurl,
            }
        });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-1', 'Update-Sop', true, 200, updatedSop, ErrorMessage_1.clientError.success.updateSuccess);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Update-Sop', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.updateSop = updateSop;
let getSingleSop = async (req, res, next) => {
    try {
        const { sopName } = req.query; // Extract sopName from query params
        if (!sopName) {
            throw new Error("SOP name is required.");
        }
        const sopData = await sop_modal_1.Sop.findOne({ sopName }); // Use findOne instead of findByName
        if (!sopData) {
            return (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-SingleSop', false, 404, {}, 'SOP not found');
        }
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-1', 'Get-SingleSop', true, 200, sopData, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-SingleSop', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getSingleSop = getSingleSop;
let deletedSop = async (req, res, next) => {
    try {
        let id = req.query._id;
        let { modifiedBy, modifiedOn } = req.body;
        const sopData = await sop_modal_1.Sop.findByIdAndUpdate({ _id: id }, {
            $set: {
                isDeleted: true,
                modifiedBy: modifiedBy,
                modifiedOn: modifiedOn
            }
        });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Delete-Sop', true, 200, sopData, ErrorMessage_1.clientError.success.deleteSuccess);
    }
    catch (error) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Delete-Sop', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, error.message);
    }
};
exports.deletedSop = deletedSop;
let getFilterSop = async (req, res, next) => {
    try {
        var findQuery;
        var andList = [];
        var limit = req.body.limit ? req.body.limit : 0;
        var page = req.body.page ? req.body.page : 0;
        andList.push({ isDeleted: false });
        andList.push({ status: 1 });
        if (req.body.sopName) {
            andList.push({ sopName: req.body.sopName });
        }
        findQuery = (andList.length > 0) ? { $and: andList } : {};
        const sopList = await sop_modal_1.Sop.find(findQuery).sort({ createdOn: -1 }).limit(limit).skip(page);
        const sopCount = await sop_modal_1.Sop.find(findQuery).count();
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Get-FilterSop', true, 200, { sopList, sopCount }, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-FilterSop', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getFilterSop = getFilterSop;
//# sourceMappingURL=sop.controller.js.map