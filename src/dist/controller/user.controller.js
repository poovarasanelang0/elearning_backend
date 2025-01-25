"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilterCourse = exports.deletedCourse = exports.getSingleCourse = exports.updateCourse = exports.getAllCourse = exports.saveUsers = void 0;
// Import dependencies
const express_validator_1 = require("express-validator");
const ErrorMessage_1 = require("../helper/ErrorMessage");
const commonResponseHandler_1 = require("../helper/commonResponseHandler");
const user_model_1 = require("../models/user.model");
const TokenManager = require("../utils/tokenManager");
const Encryption_1 = require("../helper/Encryption");
var activity = "Users";
let saveUsers = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            const UsersData = await user_model_1.User.findOne({ $and: [{ isDeleted: false }, { email: req.body.email }] });
            if (!UsersData) {
                req.body.password = await (0, Encryption_1.encrypt)(req.body.password);
                const UserDetails = req.body;
                UserDetails.createdOn = new Date();
                UserDetails.createdBy = UserDetails.name;
                const createData = new user_model_1.User(UserDetails);
                let insertData = await createData.save();
                const token = await TokenManager.CreateJWTToken({
                    id: insertData["_id"],
                    name: insertData["name"],
                });
                const result = {
                    _id: insertData._id,
                    UserName: insertData.name,
                    designation: insertData.designation,
                };
                const finalResult = {
                    loginType: 'User',
                    UserDetails: result,
                    token: token,
                };
                (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Save-User', true, 200, finalResult, ErrorMessage_1.clientError.success.registerSuccessfully);
            }
            else {
                (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Save-User', true, 422, {}, 'Email already registered');
            }
        }
        catch (err) {
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Save-User', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
        }
    }
    else {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Save-User', false, 422, {}, ErrorMessage_1.errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};
exports.saveUsers = saveUsers;
// Get all users
let getAllCourse = async (req, res, next) => {
    try {
        const data = await user_model_1.User.find({ isDeleted: false });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-1', 'GetAll-ContactUs', true, 200, data, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'GetAll-ContactUs', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getAllCourse = getAllCourse;
// Update user with designation
let updateCourse = async (req, res, next) => {
    try {
        const updateData = req.body;
        const updatedTerms = await user_model_1.User.findByIdAndUpdate({ _id: req.body._id }, {
            $set: {
                name: updateData.name,
                email: updateData.email,
                mobileNo: updateData.mobileNo,
                designation: updateData.designation, // Update designation
            },
        }, { new: true });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-1', 'Update-ContactUs', true, 200, updatedTerms, ErrorMessage_1.clientError.success.updateSuccess);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Update-ContactUs', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.updateCourse = updateCourse;
let getSingleCourse = async (req, res, next) => {
    try {
        const userId = req.query._id;
        console.log("Incoming UserId:", userId);
        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }
        const userData = await user_model_1.User.findById(userId);
        if (!userData) {
            return res.status(404).json({ message: "User not found." });
        }
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-1', 'Get-SingleUsers', true, 200, userData, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        console.error("Error fetching user data:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};
exports.getSingleCourse = getSingleCourse;
// Soft delete user
let deletedCourse = async (req, res, next) => {
    try {
        const id = req.query._id;
        const { modifiedBy, modifiedOn } = req.body;
        const usersData = await user_model_1.User.findByIdAndUpdate({ _id: id }, { $set: { isDeleted: true, modifiedBy: modifiedBy, modifiedOn: modifiedOn } });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Delete-Users', true, 200, usersData, ErrorMessage_1.clientError.success.deleteSuccess);
    }
    catch (error) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Delete-Users', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, error.message);
    }
};
exports.deletedCourse = deletedCourse;
// Filter users with designation
let getFilterCourse = async (req, res, next) => {
    try {
        const andList = [];
        const limit = req.body.limit || 0;
        const page = req.body.page || 0;
        andList.push({ isDeleted: false });
        andList.push({ status: 1 });
        if (req.body.name)
            andList.push({ name: req.body.name });
        if (req.body.email)
            andList.push({ email: req.body.email });
        if (req.body.designation)
            andList.push({ designation: req.body.designation }); // Filter by designation
        const findQuery = andList.length > 0 ? { $and: andList } : {};
        const userList = await user_model_1.User.find(findQuery).sort({ createdOn: -1 }).limit(limit).skip(page);
        const userCount = await user_model_1.User.find(findQuery).count();
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Get-FilterDeveloper', true, 200, { userList, userCount }, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-FilterDeveloper', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getFilterCourse = getFilterCourse;
//# sourceMappingURL=user.controller.js.map