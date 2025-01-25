"use strict";
// export let saveCourse = async (req, res, next) => {
//     const errors = validationResult(req);
//     if (errors.isEmpty()) {
//         try {
//             const courseData = req.body;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilterCourse = exports.deletedCourse = exports.getSingleCourse = exports.updateCourse = exports.getAllCourse = exports.saveCourse = void 0;
//             // Validate fields
//             if (!courseData.courseName) {
//                 throw new Error("Course name is required.");
//             }
//             const newCourse = new Course(courseData);
//             const savedCourse = await newCourse.save();
//             response(
//                 req,
//                 res,
//                 activity,
//                 'Level-2',
//                 'Save-ContactUs',
//                 true,
//                 200,
//                 savedCourse,
//                 clientError.success.savedSuccessfully
//             );
//         } catch (err) {
//             console.error("Error saving course:", err);
//             response(
//                 req,
//                 res,
//                 activity,
//                 'Level-3',
//                 'Save-ContactUs',
//                 false,
//                 500,
//                 {},
//                 errorMessage.internalServer,
//                 err.message
//             );
//         }
//     } else {
//         console.warn("Validation errors:", errors.mapped());
//         response(
//             req,
//             res,
//             activity,
//             'Level-3',
//             'Save-ContactUs',
//             false,
//             422,
//             {},
//             errorMessage.fieldValidation,
//             JSON.stringify(errors.mapped())
//         );
//     }
// };
// export let getAllCourse = async(req,res,next)=>{
//     try{
//         const data = await Course.find({isDeleted:false})
//         response(req,res,activity,'Level-1','GetAll-ContactUs',true,200,data,clientError.success.fetchedSuccessfully)
//      }
//      catch(err:any){
//         response(req,res,activity,'Level-3','GetAll-ContactUs',false,500,{},errorMessage.internalServer,err.message)
//     }
// }
// export let updateCourse = async (req,res,next)=>{
//     try{
//         const updateData : CourseDocument = req.body;
//         const updatedTerms = await Course.findByIdAndUpdate(
//             {_id:req.body._id},{
//             $set:{
//                 courseName:updateData.courseName,
//                 video:updateData.video,
//             }
//         })
//         response(req,res,activity,'Level-1','Update-ContactUs',true,200,updatedTerms,clientError.success.updateSuccess)
//     }catch(err:any){
//         response(req, res, activity,'Level-3','Update-ContactUs', false, 500, {}, errorMessage.internalServer, err.message)
//     }
// } 
//    export let getSingleCourse = async (req, res, next) => {
//     try {
//         const userData = await Course.findById({_id:req.query._id})
//         response(req,res,activity,'Level-1','Get-SingleUsers',true,200,userData,clientError.success.fetchedSuccessfully)
//     } catch (err:any) {
//         response(req, res, activity, 'Level-3', 'Get-SingleUsers', false, 500, {}, errorMessage.internalServer, err.message);
//     }
// }
// export let deletedCourse = async (req, res, next) => {
//     try {
//         let id = req.query._id;
//         let {modifiedBy,modifiedOn} = req.body;
//         const usersData = await Course.findByIdAndUpdate({_id:id},
//             {$set:{isDeleted:true,
//              modifiedBy:modifiedBy,
//              modifiedOn:modifiedOn
//     }});
//     response(req, res, activity, 'Level-2', 'Delete-Users', true, 200, usersData, clientError.success.deleteSuccess);
//     } catch (error: any) {
//         response(req, res, activity, 'Level-3', 'Delete-Users', false, 500, {}, errorMessage.internalServer, error.message);
//     }
// }
// export let getFilterCourse = async (req, res, next) => {
//     try {
//            var findQuery;
//            var andList: any = [];
//            var limit = req.body.limit ? req.body.limit : 0;
//            var page = req.body.page ? req.body.page : 0;
//            andList.push({ isDeleted: false })
//            andList.push({ status: 1 })
//            andList.push({ user: req.body.loginId })
//        if(req.body.courseName)
//         {
//           andList.push({ courseName: req.body.courseName })
//         }
//         findQuery = (andList.length > 0) ? { $and: andList } : {}
//         const userList = await Course.find(findQuery).sort({ createdOn: -1 }).limit(limit).skip(page)
//         const userCount = await Course.find(findQuery).count();
//         response(req, res, activity, 'Level-2', 'Get-FilterDeveloper', true, 200, {userList,userCount }, clientError.success.fetchedSuccessfully);
//        }
//        catch (err)
//        {
//        response(req, res, activity, 'Level-3', 'Get-FilterDeveloper', false, 500, {}, errorMessage.internalServer, err.message);
//       }
//     };
const course_model_1 = require("../models/course.model");
const commonResponseHandler_1 = require("../helper/commonResponseHandler");
const ErrorMessage_1 = require("../helper/ErrorMessage");
const express_validator_1 = require("express-validator");
var activity = "Course";
let saveCourse = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            const courseData = req.body;
            // Validate fields
            if (!courseData.courseName) {
                throw new Error("Course name is required.");
            }
            if (!courseData.mainVideo) {
                throw new Error("Main video is required.");
            }
            if (!courseData.courseImageUrl) {
                throw new Error("Course Image is required.");
            }
            const newCourse = new course_model_1.Course(courseData);
            const savedCourse = await newCourse.save();
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Save-Course', true, 200, savedCourse, ErrorMessage_1.clientError.success.savedSuccessfully);
        }
        catch (err) {
            console.error("Error saving course:", err);
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Save-Course', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
        }
    }
    else {
        console.warn("Validation errors:", errors.mapped());
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Save-Course', false, 422, {}, ErrorMessage_1.errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};
exports.saveCourse = saveCourse;
let getAllCourse = async (req, res, next) => {
    try {
        const data = await course_model_1.Course.find({ isDeleted: false });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-1', 'GetAll-Course', true, 200, data, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'GetAll-Course', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getAllCourse = getAllCourse;
let updateCourse = async (req, res, next) => {
    try {
        const updateData = req.body;
        const updatedCourse = await course_model_1.Course.findByIdAndUpdate({ _id: req.body._id }, {
            $set: {
                courseName: updateData.courseName,
                mainVideo: updateData.mainVideo,
                courseImageUrl: updateData.courseImageUrl,
                learningVideo: updateData.learningVideo,
            },
        }, { new: true });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-1', 'Update-Course', true, 200, updatedCourse, ErrorMessage_1.clientError.success.updateSuccess);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Update-Course', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.updateCourse = updateCourse;
let getSingleCourse = async (req, res, next) => {
    try {
        const courseData = await course_model_1.Course.findById({ _id: req.query._id });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-1', 'Get-SingleCourse', true, 200, courseData, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-SingleCourse', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
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
// export let deletedCourse = async (req, res, next) => {
//     try {
//         let id = req.query._id;  // Retrieve course ID from query params
//         // Use findByIdAndDelete to permanently delete the course
//         const deletedData = await Course.findByIdAndDelete(id);
//         if (!deletedData) {
//             return response(req, res, activity, 'Level-2', 'Delete-Users', false, 404, {}, 'Course not found or already deleted');
//         }
//         response(req, res, activity, 'Level-2', 'Delete-Users', true, 200, deletedData, 'Course permanently deleted');
//     } catch (error: any) {
//         response(req, res, activity, 'Level-3', 'Delete-Users', false, 500, {}, errorMessage.internalServer, error.message);
//     }
// }
let getFilterCourse = async (req, res, next) => {
    try {
        const { limit = 0, page = 0, courseName, loginId } = req.body;
        const andList = [
            { isDeleted: false },
            { status: 1 },
            { user: loginId },
        ];
        if (courseName) {
            andList.push({ courseName });
        }
        const findQuery = { $and: andList };
        const userList = await course_model_1.Course.find(findQuery).sort({ createdOn: -1 }).limit(limit).skip(page);
        const userCount = await course_model_1.Course.find(findQuery).count();
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Get-FilterCourse', true, 200, { userList, userCount }, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-FilterCourse', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getFilterCourse = getFilterCourse;
//# sourceMappingURL=course.controller.js.map