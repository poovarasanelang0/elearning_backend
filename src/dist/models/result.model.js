"use strict";
// import mongoose from 'mongoose';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
// export interface ResultDocument extends mongoose.Document {
//   _id?: any;
//   userId?: string;   // Add userId
//   courseId?: string; // Add courseId
//   correctAnswers?: number;
//   totalQuestions?: number;
//   answers?: any[];
//   isDeleted?: boolean;
//   status?: number;
//   modifiedOn?: Date;
//   modifiedBy?: string;
//   createdOn?: Date;
//   createdBy?: string;
//   testStatus?: string;
//   percentage?: string; // You may want to consider making percentage a number
// }
// const ResultSchema = new mongoose.Schema(
//   {
//     _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
//     courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
//     correctAnswers: { type: Number, default: 0 },
//     totalQuestions: { type: Number, default: 0 },
//     answers: [{
//       questionId: { type: String },
//       question: { type: String },
//       selectedAnswer: { type: String },
//       correctAnswer: { type: String },
//     }],
//     isDeleted: { type: Boolean, default: false },
//     status: { type: Number, default: 1 },
//     modifiedOn: { type: Date },
//     modifiedBy: { type: String },
//     createdOn: { type: Date },
//     createdBy: { type: String },
//     testStatus: { type: String }, // Default to false until the test is completed
//     percentage: { type: String }, // Default to 'fail' until evaluated
//   },
//   {
//     timestamps: true,
//   }
// );
// export const Result = mongoose.model<ResultDocument>('Result', ResultSchema);
const mongoose_1 = require("mongoose");
const ResultSchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Types.ObjectId, required: true, auto: true },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    courseId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Course', required: true },
    correctAnswers: { type: Number, default: 0 },
    totalQuestions: { type: Number, default: 0 },
    answers: [{
            questionId: { type: String },
            question: { type: String },
            selectedAnswer: { type: String },
            correctAnswer: { type: String },
        }],
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
    createdOn: { type: Date },
    createdBy: { type: String },
    testStatus: { type: String },
    percentage: { type: String },
    courseData: { type: Object },
    userData: { type: Object },
    attemptNumber: { type: Number, required: true, default: 1 }, // Ensure default value is set
}, {
    timestamps: true,
});
exports.Result = mongoose_1.default.model('Result', ResultSchema);
//# sourceMappingURL=result.model.js.map