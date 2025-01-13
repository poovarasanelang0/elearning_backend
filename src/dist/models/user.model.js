"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
;
const UserSchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Types.ObjectId, required: true, auto: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobileNo: { type: Number, required: true },
    password: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
    createdOn: { type: Date },
    createdBy: { type: String }
});
exports.User = mongoose_1.default.model('User', UserSchema);
//# sourceMappingURL=user.model.js.map