import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import EventType from "./EventType";
import ParentType from "./ParentType";
import AddressType from "./AddressType";
import { Person } from "../../db/models/Person";
import { Instruction } from "../../db/models/Instruction";
import Course from "../../db/models/Course";
import { Attendance } from "../../db/models/Attendance";
import AttendanceType from "./AttendanceType";
import InstructionType from "./InstructionType";

// @ts-ignore
export default new GraphQLObjectType({
  name: 'Person',
  // @ts-ignore
  fields: () => ({
    id: { type: GraphQLString },
    christianName: { type: GraphQLString },
    fullName: { type: GraphQLString },
    fullChristianName: {
      type: GraphQLString,
      resolve: (parent: Person) => {
        return `${parent.christianName} ${parent.fullName}`.trim();
      }
    },
    gender: { type: GraphQLString },

    birth: { type: EventType },
    baptism: { type: EventType },
    communion: { type: EventType },
    confirmation: { type: EventType },
    declaration: { type: EventType },

    father: { type: ParentType },
    mother: { type: ParentType },

    namedDate: { type: GraphQLString },
    occupation: { type: GraphQLString },
    phone: { type: GraphQLString },
    email: { type: GraphQLString },
    address: { type: AddressType },
    instructions: {
      type: new GraphQLList(InstructionType),
      resolve: async (parent: Person) => {
        const ids = parent.instructions.map(({courseId}: Instruction) => courseId);
        const courses = await Course.find({_id: ids}).sort({ year: 1, "_private.sortParam": 1 });
        return courses.map(course => {
          const instruction = parent.instructions.find(({ courseId }: Instruction) => courseId == course.id);
          const position = (instruction)? instruction.position : "";
          const year = (instruction)? instruction.year : null;
          return {instructor: parent, course, year, position};
        });
      }
    },
    attendances: {
      type: new GraphQLList(AttendanceType),
      resolve: async (parent: Person) => {
        const ids = parent.attendances.map(({courseId}: Attendance) => courseId);
        const courses = await Course.find({_id: ids}).sort({ year: 1, "_private.sortParam": 1 });
        return courses.map(course => {
          const attendance = parent.attendances.find(({ courseId }: Attendance) => courseId == course.id);
          const result = (attendance)? attendance.result : "";
          const year = (attendance)? attendance.year : null;
          return {student: parent, course, year, result};
        });
      }
    }
  })
});