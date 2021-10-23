import mongoose, { Schema } from 'mongoose';
import PersonSchema from '../schemas/PersonSchema';
import { Instruction } from "./Instruction";
import { Attendance } from "./Attendance";

const personSchema = new Schema(PersonSchema);

export interface Person extends mongoose.Document {
  christianName: string,
  fullName: string,
  gender: string,

  birth: DateAndPlace,
  baptism: DateAndPlace,
  communion: DateAndPlace,
  confirmation: DateAndPlace,
  declaration: DateAndPlace,

  father: Parent,
  mother: Parent,

  namedDate: string,
  occupation: string,
  phone: string,
  email: string,
  address: Address,

  instructions: [Instruction],
  attendances: [Attendance],

  _private: {
    sortParam: string
  }
}

export interface Address {
  streetNumber?: string,
  streetName?: string,
  ward?: string,
  district?: string,
  area?: string,
  phone?: string,
}

export interface Parent {
  christianName: string,
  fullName: string,
  phone: string,
}

export interface DateAndPlace {
  date: Date,
  place: string,
}

export default mongoose.model<Person>('Person', personSchema);
