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


// TODO: methods
// kittySchema.methods.speak = function () {
//   const greeting = this.name
//     ? "Meow name is " + this.name
//     : "I don't have a name";
//   console.log(greeting);
// }

// TODO: virtual
// personSchema.virtual('fullName').get(function() {
//   return this.name.first + ' ' + this.name.last;
// });

export default mongoose.model<Course>('Course', courseSchema);
