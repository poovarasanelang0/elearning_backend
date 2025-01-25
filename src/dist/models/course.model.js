"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const mongoose_1 = require("mongoose");
const courseSchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Types.ObjectId, required: true, auto: true },
    courseName: { type: String, required: true },
    mainVideo: { type: String, required: true },
    courseImageUrl: { type: String, required: true },
    learningVideo: { type: String },
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
    createdOn: { type: Date },
    createdBy: { type: String },
});
exports.Course = mongoose_1.default.model('Course', courseSchema);
//# sourceMappingURL=course.model.js.map