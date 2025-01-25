import mongoose from 'mongoose';

export interface CourseDocument extends mongoose.Document {
    _id?: any;
    courseName?: string;
    mainVideo?: string; // Required video
    courseImageUrl?:string;
    learningVideo?: string; 
    isDeleted?: boolean;
    status?: number;
    modifiedOn?: Date;
    modifiedBy?: string;
    createdOn?: Date;
    createdBy?: string;
}

const courseSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
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

export const Course = mongoose.model('Course', courseSchema);