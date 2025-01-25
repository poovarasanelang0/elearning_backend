import mongoose from 'mongoose';

// Define the interface for the User document
export interface UserDocument extends mongoose.Document {
    _id?: any;
    name?: string;
    email?: string;
    mobileNo?: number;
    nricnumber?: String;

    password?: string;
    designation?: string; // New field added
    isDeleted?: boolean;
    status?: number;
    modifiedOn?: Date;
    modifiedBy?: string;
    createdOn?: Date;
    createdBy?: string;
}

// Define the User schema
const UserSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobileNo: { type: Number, required: true },
    nricnumber: { type: String, required: true },
    password: { type: String, required: true },
    designation: { type: String, required: false }, // New field added to schema
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
    createdOn: { type: Date },
    createdBy: { type: String },
});

export const User = mongoose.model('User', UserSchema);
