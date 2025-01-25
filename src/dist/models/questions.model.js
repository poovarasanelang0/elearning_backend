"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const mongoose_1 = require("mongoose");
;
const questionSchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Types.ObjectId, required: true, auto: true },
    courseName: { type: String, required: true },
    question: { type: String, required: true },
    courseId: { type: mongoose_1.default.Types.ObjectId, required: true },
    video: { type: String, required: true },
    answer: { type: String, required: true },
    option1: { type: String, required: true },
    option2: { type: String, required: true },
    option3: { type: String },
    option4: { type: String },
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
    createdOn: { type: Date },
    createdBy: { type: String }
});
exports.Question = mongoose_1.default.model('Question', questionSchema);
//# sourceMappingURL=questions.model.js.map