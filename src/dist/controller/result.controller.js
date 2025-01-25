"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllResults = exports.getUserResult = exports.getPassCounts = exports.getResult = exports.createResult = void 0;
const result_model_1 = require("../models/result.model");
const express_validator_1 = require("express-validator");
const commonResponseHandler_1 = require("../helper/commonResponseHandler");
const ErrorMessage_1 = require("../helper/ErrorMessage");
const course_model_1 = require("../models/course.model");
const user_model_1 = require("../models/user.model");
const activity = 'Result';
let createResult = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Create-Result', false, 422, {}, ErrorMessage_1.errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
    try {
        const { userId, courseId, correctAnswers, totalQuestions, percentage, testStatus, answers } = req.body;
        if (!userId || !courseId) {
            return (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Create-Result', false, 400, {}, 'User ID and Course ID are required.');
        }
        if (!Array.isArray(answers)) {
            return (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Create-Result', false, 400, {}, 'Answers must be an array.');
        }
        const courseData = await course_model_1.Course.findById(courseId);
        if (!courseData) {
            return (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Create-Result', false, 404, {}, 'Course not found.');
        }
        // Use the correct model to fetch user data
        const userData = await user_model_1.User.findById(userId);
        if (!userData) {
            return (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Create-Result', false, 404, {}, 'User not found.');
        }
        let attemptNumber = 1;
        const existingResult = await result_model_1.Result.findOne({ userId, courseId });
        if (existingResult) {
            if (existingResult.testStatus === 'complete' && parseInt(existingResult.percentage, 10) >= 80) {
                return (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Create-Result', false, 422, {}, 'User has already passed the test. Further attempts are not allowed.');
            }
            attemptNumber = existingResult.attemptNumber + 1;
        }
        const newResultDetails = {
            userId,
            courseId,
            correctAnswers,
            totalQuestions,
            percentage,
            testStatus,
            createdOn: new Date(),
            answers,
            courseData,
            userData,
            attemptNumber,
        };
        const newResult = new result_model_1.Result(newResultDetails);
        const insertedData = await newResult.save();
        return (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Create-Result', true, 200, insertedData, ErrorMessage_1.clientError.success.savedSuccessfully);
    }
    catch (err) {
        console.error(err);
        return (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Create-Result', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.createResult = createResult;
let getResult = async (req, res, next) => {
    const { userId } = req.query;
    if (!userId) {
        return (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-Result', false, 400, {}, 'User ID is required.');
    }
    try {
        const results = await result_model_1.Result.find({ userId });
        if (!results || results.length === 0) {
            return (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-Result', false, 404, {}, 'No results found for the specified user.');
        }
        return (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Get-Result', true, 200, results, 'Results retrieved successfully.');
    }
    catch (err) {
        console.error(err);
        return (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-Result', false, 500, {}, 'Internal Server Error', err.message || 'Unknown error occurred.');
    }
};
exports.getResult = getResult;
// working code 
// export let getPassCounts = async (req, res, next) => {
//   const { courseId } = req.query;
//   try {
//     // Prepare the filter for the Result query
//     const filter = {
//       $expr: { $gte: [{ $toDouble: "$percentage" }, 80] },
//       testStatus: "complete",
//     };
//         if (courseId) {
//       filter["courseId"] = courseId;
//     }
//     // Find the results based on the filter
//     const results = await Result.find(filter);
//     if (!results || results.length === 0) {
//       return response(
//         req,
//         res,
//         activity,
//         'Level-3',
//         'Get-Pass-Counts',
//         false,
//         404,
//         {},
//         'No results found for the specified query.'
//       );
//     }
//     // Initialize counters
//     let totalPassCount = 0;
//     const attemptPassCounts = { 1: 0, 2: 0, 3: 0 };
//     const coursePassCounts = {};
//     // Iterate through results and accumulate counts
//     for (let result of results) {
//       totalPassCount++;
//       const attempt = result.attemptNumber;
//       if (attempt === 1) {
//         attemptPassCounts[1]++;
//       } else if (attempt === 2) {
//         attemptPassCounts[2]++;
//       } else {
//         attemptPassCounts[3]++;
//       }
//       const courseId = result.courseId.toString();
//       if (!coursePassCounts[courseId]) {
//         // Fetch course details to add the course name
//         const course = await Course.findById(courseId);
//         coursePassCounts[courseId] = {
//           courseName: course ? course.courseName : 'Unknown', // Default to 'Unknown' if course not found
//           passCount: 0,
//           'attempt-1Count': 0,
//           'attempt-2Count': 0,
//           'attempt-3Count': 0,
//         };
//       }
//       // Increment pass count per course and attempt
//       coursePassCounts[courseId].passCount++;
//       if (attempt === 1) {
//         coursePassCounts[courseId]['attempt-1Count']++;
//       } else if (attempt === 2) {
//         coursePassCounts[courseId]['attempt-2Count']++;
//       } else {
//         coursePassCounts[courseId]['attempt-3Count']++;
//       }
//     }
//     // Return the response with the pass counts and course names
//     return response(
//       req,
//       res,
//       activity,
//       'Level-2',
//       'Get-Pass-Counts',
//       true,
//       200,
//       {
//         totalPassCount,
//         attemptPassCounts,
//         coursePassCounts,
//       },
//       'Pass counts retrieved successfully.'
//     );
//   } catch (err) {
//     console.error(err);
//     return response(
//       req,
//       res,
//       activity,
//       'Level-3',
//       'Get-Pass-Counts',
//       false,
//       500,
//       {},
//       'Internal Server Error',
//       err.message || 'Unknown error occurred.'
//     );
//   }
// };
let getPassCounts = async (req, res, next) => {
    const { courseId } = req.query;
    try {
        const filter = {
            $expr: { $gte: [{ $toDouble: "$percentage" }, 80] },
            testStatus: "complete",
        };
        if (courseId) {
            filter["courseId"] = courseId;
        }
        // Find the results based on the filter
        const results = await result_model_1.Result.find(filter);
        if (!results || results.length === 0) {
            return (0, commonResponseHandler_1.response)(req, res, activity, "Level-3", "Get-Pass-Counts", false, 404, {}, "No results found for the specified query.");
        }
        // Initialize counters
        let totalPassCount = 0;
        let totalAttemptCount = 0; // Initialize total attempt count
        const attemptPassCounts = { 1: 0, 2: 0, 3: 0 };
        const coursePassCounts = {};
        // Iterate through results and accumulate counts
        for (let result of results) {
            totalPassCount++;
            const attempt = result.attemptNumber;
            if (attempt === 1) {
                attemptPassCounts[1]++;
            }
            else if (attempt === 2) {
                attemptPassCounts[2]++;
            }
            else {
                attemptPassCounts[3]++;
            }
            const courseId = result.courseId.toString();
            if (!coursePassCounts[courseId]) {
                // Fetch course details to add the course name
                const course = await course_model_1.Course.findById(courseId);
                coursePassCounts[courseId] = {
                    courseName: course ? course.courseName : "Unknown", // Default to 'Unknown' if course not found
                    passCount: 0,
                    "attempt-1Count": 0,
                    "attempt-2Count": 0,
                    "attempt-3Count": 0,
                    totalAttemptCount: 0, // Initialize total attempt count
                };
            }
            // Increment pass count per course and attempt
            coursePassCounts[courseId].passCount++;
            if (attempt === 1) {
                coursePassCounts[courseId]["attempt-1Count"]++;
            }
            else if (attempt === 2) {
                coursePassCounts[courseId]["attempt-2Count"]++;
            }
            else if (attempt === 3) {
                coursePassCounts[courseId]["attempt-3Count"]++;
            }
            // Update total attempt count for the course
            coursePassCounts[courseId].totalAttemptCount++;
            totalAttemptCount++; // Increment global total attempt count
        }
        return (0, commonResponseHandler_1.response)(req, res, activity, "Level-3", "Get-Pass-Counts", true, 200, {
            totalPassCount,
            totalAttemptCount,
            attemptPassCounts,
            coursePassCounts,
        }, "Pass counts retrieved successfully.");
    }
    catch (error) {
        console.error("Error fetching pass counts:", error);
        return (0, commonResponseHandler_1.response)(req, res, activity, "Level-3", "Get-Pass-Counts", false, 500, {}, "Failed to retrieve pass counts.");
    }
};
exports.getPassCounts = getPassCounts;
const getUserResult = async (req, res) => {
    try {
        const data = await result_model_1.Result.find({ userId: req.query.userId });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-1', 'GetSingle-Program', true, 200, data, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-1', 'GetSingle-Program', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getUserResult = getUserResult;
const getAllResults = async (req, res) => {
    try {
        const results = await result_model_1.Result.find();
        console.log("results:", results);
        if (!results || results.length === 0) {
            return (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-All-Results', false, 404, {}, 'No results found.');
        }
        return (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Get-All-Results', true, 200, results, 'Results retrieved successfully.');
    }
    catch (err) {
        console.error('Error fetching all results:', err);
        return (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-All-Results', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message || 'An unknown error occurred.');
    }
};
exports.getAllResults = getAllResults;
//# sourceMappingURL=result.controller.js.map