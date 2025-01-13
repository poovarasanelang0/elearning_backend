"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
const mongoose_1 = require("mongoose");
const ResultSchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Types.ObjectId, required: true, auto: true },
    correctAnswers: { type: Number, default: 0 },
    totalQuestions: { type: Number, default: 0 },
    answers: [{
            questionId: { type: String, },
            question: { type: String, },
            selectedAnswer: { type: String, },
            correctAnswer: { type: String },
        }],
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
    createdOn: { type: Date },
    createdBy: { type: String },
}, {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
});
exports.Result = mongoose_1.default.model('Result', ResultSchema);
//# sourceMappingURL=result.model.js.map