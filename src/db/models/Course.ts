import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';
import CourseSchema from '../schemas/CourseSchema';
import { Instruction } from "./Instruction";
import { Attendance } from "./Attendance";

const courseSchema = new Schema(CourseSchema);

export interface Course extends mongoose.Document {
  year: number,
  family: string,
  level: number,
  group: string,
  location: string,

  instructions: [Instruction],
  attendances: [Attendance],

  _private: {
    sortParam: string
  }
}

export default mongoose.model<Course>('Course', courseSchema);
