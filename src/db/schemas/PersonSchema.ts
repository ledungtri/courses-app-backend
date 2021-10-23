import TrimmedStringSchema from './TrimmedStringSchema';
import InstructionSchema from './InstructionSchema';
import AttendanceSchema from './AttendanceSchema';

const ParentSchema = {
  christianName: TrimmedStringSchema,
  fullName: TrimmedStringSchema,
  phone: TrimmedStringSchema,
};

const DateAndPlaceSchema = {
  date: Date,
  place: TrimmedStringSchema,
};

const AddressSchema = {
  streetNumber: TrimmedStringSchema,
  streetName: TrimmedStringSchema,
  ward: TrimmedStringSchema,
  district: TrimmedStringSchema,
  area: TrimmedStringSchema,
  phone: TrimmedStringSchema,
};

export default {
  christianName: TrimmedStringSchema,
  fullName: TrimmedStringSchema,
  gender: { type: String, trim: true, enum: ['Nam', 'Nữ'] },

  birth: DateAndPlaceSchema,
  baptism: DateAndPlaceSchema,
  communion: DateAndPlaceSchema,
  confirmation: DateAndPlaceSchema,
  declaration: DateAndPlaceSchema,

  father: ParentSchema,
  mother: ParentSchema,

  namedDate: TrimmedStringSchema,
  occupation: TrimmedStringSchema,
  phone: TrimmedStringSchema,
  email: TrimmedStringSchema,
  address: AddressSchema,

  instructions: [InstructionSchema],
  attendances: [AttendanceSchema],

  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },

  _private: {
    sortParam: TrimmedStringSchema
  }
};
