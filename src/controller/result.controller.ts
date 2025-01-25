import { Result, ResultDocument } from '../models/result.model';
import { validationResult } from 'express-validator';
import { response } from '../helper/commonResponseHandler';
import { clientError, errorMessage } from '../helper/ErrorMessage';
import { Course } from '../models/course.model'; 
import { User } from "../models/user.model";

const activity = 'Result';

export let createResult = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return response(
      req,
      res,
      activity,
      'Level-3',
      'Create-Result',
      false,
      422,
      {},
      errorMessage.fieldValidation,
      JSON.stringify(errors.mapped())
    );
  }

  try {
    const { userId, courseId, correctAnswers, totalQuestions, percentage, testStatus, answers } = req.body;

    if (!userId || !courseId) {
      return response(
        req,
        res,
        activity,
        'Level-3',
        'Create-Result',
        false,
        400,
        {},
        'User ID and Course ID are required.'
      );
    }

    if (!Array.isArray(answers)) {
      return response(
        req,
        res,
        activity,
        'Level-3',
        'Create-Result',
        false,
        400,
        {},
        'Answers must be an array.'
      );
    }

    const courseData = await Course.findById(courseId);
    if (!courseData) {
      return response(
        req,
        res,
        activity,
        'Level-3',
        'Create-Result',
        false,
        404,
        {},
        'Course not found.'
      );
    }

    // Use the correct model to fetch user data
    const userData = await User.findById(userId);
    if (!userData) {
      return response(
        req,
        res,
        activity,
        'Level-3',
        'Create-Result',
        false,
        404,
        {},
        'User not found.'
      );
    }

    let attemptNumber = 1;
    const existingResult = await Result.findOne({ userId, courseId });

    if (existingResult) {
      if (existingResult.testStatus === 'complete' && parseInt(existingResult.percentage, 10) >= 80) {
        return response(
          req,
          res,
          activity,
          'Level-3',
          'Create-Result',
          false,
          422,
          {},
          'User has already passed the test. Further attempts are not allowed.'
        );
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

    const newResult = new Result(newResultDetails);
    const insertedData = await newResult.save();

    return response(
      req,
      res,
      activity,
      'Level-2',
      'Create-Result',
      true,
      200,
      insertedData,
      clientError.success.savedSuccessfully
    );
  } catch (err) {
    console.error(err);
    return response(
      req,
      res,
      activity,
      'Level-3',
      'Create-Result',
      false,
      500,
      {},
      errorMessage.internalServer,
      err.message
    );
  }
};


export let getResult = async (req, res, next) => {
  const { userId } = req.query;

  if (!userId) {
    return response(
      req,
      res,
      activity,
      'Level-3',
      'Get-Result',
      false,
      400,
      {},
      'User ID is required.'
    );
  }

  try {
    const results = await Result.find({ userId });

    if (!results || results.length === 0) {
      return response(
        req,
        res,
        activity,
        'Level-3',
        'Get-Result',
        false,
        404,
        {},
        'No results found for the specified user.'
      );
    }

    return response(
      req,
      res,
      activity,
      'Level-2',
      'Get-Result',
      true,
      200,
      results,
      'Results retrieved successfully.'
    );
  } catch (err) {
    console.error(err);
    return response(
      req,
      res,
      activity,
      'Level-3',
      'Get-Result',
      false,
      500,
      {},
      'Internal Server Error',
      err.message || 'Unknown error occurred.'
    );
  }
};

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


export let getPassCounts = async (req, res, next) => {
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
    const results = await Result.find(filter);

    if (!results || results.length === 0) {
      return response(
        req,
        res,
        activity,
        "Level-3",
        "Get-Pass-Counts",
        false,
        404,
        {},
        "No results found for the specified query."
      );
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
      } else if (attempt === 2) {
        attemptPassCounts[2]++;
      } else {
        attemptPassCounts[3]++;
      }

      const courseId = result.courseId.toString();
      if (!coursePassCounts[courseId]) {
        // Fetch course details to add the course name
        const course = await Course.findById(courseId);
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
      } else if (attempt === 2) {
        coursePassCounts[courseId]["attempt-2Count"]++;
      } else if (attempt === 3) {
        coursePassCounts[courseId]["attempt-3Count"]++;
      }

      // Update total attempt count for the course
      coursePassCounts[courseId].totalAttemptCount++;
      totalAttemptCount++; // Increment global total attempt count
    }

    return response(
      req,
      res,
      activity,
      "Level-3",
      "Get-Pass-Counts",
      true,
      200,
      {
        totalPassCount,
        totalAttemptCount,
        attemptPassCounts,
        coursePassCounts,
      },
      "Pass counts retrieved successfully."
    );
  } catch (error) {
    console.error("Error fetching pass counts:", error);
    return response(
      req,
      res,
      activity,
      "Level-3",
      "Get-Pass-Counts",
      false,
      500,
      {},
      "Failed to retrieve pass counts."
    );
  }
};




export const getUserResult = async (req, res) => {
  try {

      const data = await Result.find({ userId: req.query.userId })

      response(req, res, activity, 'Level-1', 'GetSingle-Program', true, 200, data, clientError.success.fetchedSuccessfully)
  } catch (err: any) {
      response(req, res, activity, 'Level-1', 'GetSingle-Program', false, 500, {}, errorMessage.internalServer, err.message)
  }
}


export const getAllResults = async (req, res) => {
  try {
    const results = await Result.find();
      console.log("results:",results);

    if (!results || results.length === 0) {
      return response(
        req,
        res,
        activity,
        'Level-3',
        'Get-All-Results',
        false,
        404,
        {},
        'No results found.'
      );
    }

    return response(
      req,
      res,
      activity,
      'Level-2',
      'Get-All-Results',
      true,
      200,
      results,
      'Results retrieved successfully.'
    );
  } catch (err) {
    console.error('Error fetching all results:', err);
    return response(
      req,
      res,
      activity,
      'Level-3',
      'Get-All-Results',
      false,
      500,
      {},
      errorMessage.internalServer,
      err.message || 'An unknown error occurred.'
    );
  }
};