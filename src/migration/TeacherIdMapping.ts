import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';

const idMappingSchema = new Schema({
  type: String,
  oldId: Number,
  newId: Schema.Types.ObjectId,
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

export default mongoose.model('TeacherIdMapping', idMappingSchema);
