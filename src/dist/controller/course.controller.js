"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilterCourse = exports.deletedCourse = exports.getSingleCourse = exports.updateCourse = exports.getAllCourse = exports.saveCourse = void 0;
const course_model_1 = require("../models/course.model");
const commonResponseHandler_1 = require("../helper/commonResponseHandler");
const ErrorMessage_1 = require("../helper/ErrorMessage");
const express_validator_1 = require("express-validator");
var activity = "Course";
let saveCourse = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            const createInvestors = req.body;
            const createData = new course_model_1.Course(createInvestors);
            const insertData = await createData.save();
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Save-ContactUs', true, 200, insertData, ErrorMessage_1.clientError.success.savedSuccessfully);
        }
        catch (err) {
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Save-ContactUs', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
        }
    }
    else {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Save-ContactUs', false, 422, {}, ErrorMessage_1.errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};
exports.saveCourse = saveCourse;
let getAllCourse = async (req, res, next) => {
    try {
        const data = await course_model_1.Course.find({ isDeleted: false });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-1', 'GetAll-ContactUs', true, 200, data, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'GetAll-ContactUs', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getAllCourse = getAllCourse;
let updateCourse = async (req, res, next) => {
    try {
        const updateData = req.body;
        const updatedTerms = await course_model_1.Course.findByIdAndUpdate({ _id: req.body._id }, {
            $set: {
                courseName: updateData.courseName,
                video: updateData.video,
            }
        });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-1', 'Update-ContactUs', true, 200, updatedTerms, ErrorMessage_1.clientError.success.updateSuccess);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Update-ContactUs', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.updateCourse = updateCourse;
let getSingleCourse = async (req, res, next) => {
    try {
        const userData = await course_model_1.Course.findById({ _id: req.query._id });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-1', 'Get-SingleUsers', true, 200, userData, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-SingleUsers', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getSingleCourse = getSingleCourse;
let deletedCourse = async (req, res, next) => {
    try {
        let id = req.query._id;
        let { modifiedBy, modifiedOn } = req.body;
        const usersData = await course_model_1.Course.findByIdAndUpdate({ _id: id }, { $set: { isDeleted: true,
                modifiedBy: modifiedBy,
                modifiedOn: modifiedOn
            } });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Delete-Users', true, 200, usersData, ErrorMessage_1.clientError.success.deleteSuccess);
    }
    catch (error) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Delete-Users', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, error.message);
    }
};
exports.deletedCourse = deletedCourse;
let getFilterCourse = async (req, res, next) => {
    try {
        var findQuery;
        var andList = [];
        var limit = req.body.limit ? req.body.limit : 0;
        var page = req.body.page ? req.body.page : 0;
        andList.push({ isDeleted: false });
        andList.push({ status: 1 });
        andList.push({ user: req.body.loginId });
        if (req.body.courseName) {
            andList.push({ courseName: req.body.courseName });
        }
        findQuery = (andList.length > 0) ? { $and: andList } : {};
        const userList = await course_model_1.Course.find(findQuery).sort({ createdOn: -1 }).limit(limit).skip(page);
        const userCount = await course_model_1.Course.find(findQuery).count();
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Get-FilterDeveloper', true, 200, { userList, userCount }, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-FilterDeveloper', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getFilterCourse = getFilterCourse;
//# sourceMappingURL=course.controller.js.map