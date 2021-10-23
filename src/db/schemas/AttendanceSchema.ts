import { Schema } from 'mongoose';
import TrimmedStringSchema from './TrimmedStringSchema';

export default new Schema({
  year: Number,
  courseId: Schema.Types.ObjectId,
  studentId: Schema.Types.ObjectId,
  result: TrimmedStringSchema,
}, {_id: false});
