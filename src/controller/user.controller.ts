// Import dependencies
import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { response } from "../helper/commonResponseHandler";
import { User, UserDocument } from "../models/user.model";
import * as TokenManager from "../utils/tokenManager";
import { encrypt, decrypt, hashPassword } from "../helper/Encryption";

var activity = "Users";

export let saveUsers = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const UsersData = await User.findOne({ $and: [{ isDeleted: false }, { email: req.body.email }] });
            if (!UsersData) {
                req.body.password = await encrypt(req.body.password);
                const UserDetails: UserDocument = req.body;
                UserDetails.createdOn = new Date();
                UserDetails.createdBy = UserDetails.name;
                const createData = new User(UserDetails);
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
                response(req, res, activity, 'Level-2', 'Save-User', true, 200, finalResult, clientError.success.registerSuccessfully);
            } else {
                response(req, res, activity, 'Level-3', 'Save-User', true, 422, {}, 'Email already registered');
            }
        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'Save-User', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Save-User', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};

// Get all users
export let getAllCourse = async (req, res, next) => {
    try {
        const data = await User.find({ isDeleted: false });
        response(req, res, activity, 'Level-1', 'GetAll-ContactUs', true, 200, data, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'GetAll-ContactUs', false, 500, {}, errorMessage.internalServer, err.message);
    }
};

// Update user with designation
export let updateCourse = async (req, res, next) => {
    try {
        const updateData: UserDocument = req.body;
        const updatedTerms = await User.findByIdAndUpdate(
            { _id: req.body._id },
            {
                $set: {
                    name: updateData.name,
                    email: updateData.email,
                    mobileNo: updateData.mobileNo,
                    designation: updateData.designation, // Update designation
                },
            },
            { new: true }
        );
        response(req, res, activity, 'Level-1', 'Update-ContactUs', true, 200, updatedTerms, clientError.success.updateSuccess);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Update-ContactUs', false, 500, {}, errorMessage.internalServer, err.message);
    }
};

export let getSingleCourse = async (req, res, next) => {
    try {
        const userId = req.query._id;
        console.log("Incoming UserId:", userId);

        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }

        const userData = await User.findById(userId);
        if (!userData) {
            return res.status(404).json({ message: "User not found." });
        }

        response(req, res, activity, 'Level-1', 'Get-SingleUsers', true, 200, userData, clientError.success.fetchedSuccessfully);
    } catch (err) {
        console.error("Error fetching user data:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};


// Soft delete user
export let deletedCourse = async (req, res, next) => {
    try {
        const id = req.query._id;
        const { modifiedBy, modifiedOn } = req.body;
        const usersData = await User.findByIdAndUpdate(
            { _id: id },
            { $set: { isDeleted: true, modifiedBy: modifiedBy, modifiedOn: modifiedOn } }
        );
        response(req, res, activity, 'Level-2', 'Delete-Users', true, 200, usersData, clientError.success.deleteSuccess);
    } catch (error: any) {
        response(req, res, activity, 'Level-3', 'Delete-Users', false, 500, {}, errorMessage.internalServer, error.message);
    }
};

// Filter users with designation
export let getFilterCourse = async (req, res, next) => {
    try {
        const andList: any = [];
        const limit = req.body.limit || 0;
        const page = req.body.page || 0;
        andList.push({ isDeleted: false });
        andList.push({ status: 1 });
        if (req.body.name) andList.push({ name: req.body.name });
        if (req.body.email) andList.push({ email: req.body.email });
        if (req.body.designation) andList.push({ designation: req.body.designation }); // Filter by designation
        const findQuery = andList.length > 0 ? { $and: andList } : {};
        const userList = await User.find(findQuery).sort({ createdOn: -1 }).limit(limit).skip(page);
        const userCount = await User.find(findQuery).count();
        response(req, res, activity, 'Level-2', 'Get-FilterDeveloper', true, 200, { userList, userCount }, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-FilterDeveloper', false, 500, {}, errorMessage.internalServer, err.message);
    }
};