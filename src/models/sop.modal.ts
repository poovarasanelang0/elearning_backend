import mongoose from 'mongoose';

export interface SopDocument extends mongoose.Document {
    _id?: any;
    sopName?: string;
    pdfurl?: string;
    isDeleted?: boolean;
    status?: number;
    modifiedOn?: Date;
    modifiedBy?: string;
    createdOn?: Date;
    createdBy?: string;
};

const sopSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    sopName: { type: String, required: true },
    pdfurl: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
    createdOn: { type: Date },
    createdBy: { type: String }
});

export const Sop = mongoose.model('Sop', sopSchema);
