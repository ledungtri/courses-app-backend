import TrimmedStringSchema from './TrimmedStringSchema';
import InstructionSchema from './InstructionSchema';
import AttendanceSchema from './AttendanceSchema';

export default {
  year: Number,
  family: TrimmedStringSchema,
  level: Number,
  group: TrimmedStringSchema,
  location: TrimmedStringSchema,

  instructions: [InstructionSchema],
  attendances: [AttendanceSchema],

  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },

  _private: {
    sortParam: TrimmedStringSchema
  }
};
