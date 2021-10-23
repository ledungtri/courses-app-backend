import { ObjectId } from "mongoose";

export interface Attendance {
  year: number,
  courseId: ObjectId,
  studentId:ObjectId,
  result: string,
}
