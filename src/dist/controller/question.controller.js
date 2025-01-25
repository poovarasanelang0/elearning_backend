"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilterCourse = exports.deletedCourse = exports.getCourseProgram = exports.getSingleCourse = exports.updateCourse = exports.getAllCourse = exports.saveCourse = void 0;
const questions_model_1 = require("../models/questions.model");
const commonResponseHandler_1 = require("../helper/commonResponseHandler");
const ErrorMessage_1 = require("../helper/ErrorMessage");
const express_validator_1 = require("express-validator");
var activity = "Question";
let saveCourse = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            const createInvestors = req.body;
            const createData = new questions_model_1.Question(createInvestors);
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
        const data = await questions_model_1.Question.find({ isDeleted: false });
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
        const updatedTerms = await questions_model_1.Question.findByIdAndUpdate({ _id: req.body._id }, {
            $set: {
                courseName: updateData.courseName,
                question: updateData.question,
                answer: updateData.answer,
                option1: updateData.option1,
                option2: updateData.option2,
                option3: updateData.option3,
                option4: updateData.option4
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
        const userData = await questions_model_1.Question.findById({ _id: req.query._id });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-1', 'Get-SingleUsers', true, 200, userData, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-SingleUsers', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getSingleCourse = getSingleCourse;
const getCourseProgram = async (req, res) => {
    try {
        const data = await questions_model_1.Question.find({ courseId: req.query.courseId });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-1', 'GetSingle-Program', true, 200, data, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-1', 'GetSingle-Program', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getCourseProgram = getCourseProgram;
// export let deletedCourse = async (req, res, next) => {
//     try {
//         let id = req.query._id;
//         let {modifiedBy,modifiedOn} = req.body;
//         const usersData = await Question.findByIdAndUpdate({_id:id},
//             {$set:{isDeleted:true,
//              modifiedBy:modifiedBy,
//              modifiedOn:modifiedOn
//     }});
//     response(req, res, activity, 'Level-2', 'Delete-Users', true, 200, usersData, clientError.success.deleteSuccess);
//     } catch (error: any) {
//         response(req, res, activity, 'Level-3', 'Delete-Users', false, 500, {}, errorMessage.internalServer, error.message);
//     }
// }
let deletedCourse = async (req, res, next) => {
    try {
        let id = req.query._id; // Retrieve course ID from query params
        // Use findByIdAndDelete to permanently delete the course
        const deletedData = await questions_model_1.Question.findByIdAndDelete(id);
        if (!deletedData) {
            return (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Delete-Users', false, 404, {}, 'Question not found or already deleted');
        }
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Delete-Users', true, 200, deletedData, 'Question permanently deleted');
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
        if (req.body.question) {
            andList.push({ question: req.body.question });
        }
        if (req.body.answer) {
            andList.push({ answer: req.body.answer });
        }
        if (req.body.option1) {
            andList.push({ option1: req.body.option1 });
        }
        if (req.body.option2) {
            andList.push({ option2: req.body.option2 });
        }
        if (req.body.option3) {
            andList.push({ option3: req.body.option3 });
        }
        if (req.body.option4) {
            andList.push({ option4: req.body.option4 });
        }
        findQuery = (andList.length > 0) ? { $and: andList } : {};
        const userList = await questions_model_1.Question.find(findQuery).sort({ createdOn: -1 }).limit(limit).skip(page);
        const userCount = await questions_model_1.Question.find(findQuery).count();
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Get-FilterDeveloper', true, 200, { userList, userCount }, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-FilterDeveloper', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getFilterCourse = getFilterCourse;
//# sourceMappingURL=question.controller.js.map