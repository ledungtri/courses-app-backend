import { ObjectId } from "mongoose";

export interface Instruction {
  courseId: ObjectId,
  teacherId: ObjectId,
  year?: number,
  position?: string,
}
