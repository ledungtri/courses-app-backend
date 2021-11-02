import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { Attendance } from "../../db/models/Attendance";
import { Instruction } from "../../db/models/Instruction";
import Person from "../../db/models/Person";
import { Course } from "../../db/models/Course";
import AttendanceType from "./AttendanceType";
import InstructionType from "./InstructionType";

// @ts-ignore
export default new GraphQLObjectType({
  name: 'Course',
  // @ts-ignore
  fields: () => ({
    id: { type: GraphQLString },
    year: { type: GraphQLInt },
    family: { type: GraphQLString },
    level: { type: GraphQLInt },
    group: { type: GraphQLString },
    name: {
      type: GraphQLString,
      resolve: (parent) => {
        return `${parent.family} ${parent.level || ''}${parent.group || ''}`.trim();
      }
    },
    location: { type: GraphQLString },

    total: {
      type: GraphQLInt,
      resolve: (parent) => parent.attendances.length
    },
    onGoing: {
      type: GraphQLInt,
      resolve: (parent) => parent.attendances.filter(({ result }: Attendance) => result === "Đang Học").length
    },
    droppedOut: {
      type: GraphQLInt,
      resolve: (parent) => parent.attendances.filter(({ result }: Attendance) => result === "Nghỉ Luôn").length
    },
    transferred: {
      type: GraphQLInt,
      resolve: (parent) => parent.attendances.filter(({ result }: Attendance) => result === "Chuyển Xứ").length
    },
    failed: {
      type: GraphQLInt,
      resolve: (parent) => parent.attendances.filter(({ result }: Attendance) => result === "Học Lại").length
    },
    passed: {
      type: GraphQLInt,
      resolve: (parent) => parent.attendances.filter(({ result }: Attendance) => result === "Lên Lớp").length
    },
    instructions: {
      type: new GraphQLList(InstructionType),
      resolve: async (parent: Course) => {
        const ids = parent.instructions.map(({ teacherId }: Instruction) => teacherId);
        const instructors = await Person.find({ _id: ids }).sort({ "_private.sortParam": 1 });
        return instructors.map(instructor => {
          const instruction = parent.instructions.find(({ teacherId }: Instruction) => teacherId == instructor.id);
          const position = (instruction)? instruction.position : "";
          return {instructor, course: parent, year: parent.year, position};
        });
      }
    },
    attendances: {
      type: new GraphQLList(AttendanceType),
      resolve: async (parent: Course) => {
        const ids = parent.attendances.map(({ studentId }: Attendance) => studentId);
        const students = await Person.find({ _id: ids }).sort({ "_private.sortParam": 1 });
        return students.map(student => {
          const attendance = parent.attendances.find(({ studentId }: Attendance) => studentId == student.id);
          const result = (attendance)? attendance.result : "";
          return {student, course: parent, year: parent.year, result};
        });
      }
    }
  })
});