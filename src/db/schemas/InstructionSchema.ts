import { Schema } from 'mongoose';
import TrimmedStringSchema from './TrimmedStringSchema';

export default new Schema({
  year: Number,
  courseId: Schema.Types.ObjectId,
  teacherId: Schema.Types.ObjectId,
  position: TrimmedStringSchema,
}, {_id: false});
