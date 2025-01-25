"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sop = void 0;
const mongoose_1 = require("mongoose");
;
const sopSchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Types.ObjectId, required: true, auto: true },
    sopName: { type: String, required: true },
    pdfurl: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
    createdOn: { type: Date },
    createdBy: { type: String }
});
exports.Sop = mongoose_1.default.model('Sop', sopSchema);
//# sourceMappingURL=sop.modal.js.map