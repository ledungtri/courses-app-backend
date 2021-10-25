import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import PersonType from "./PersonType";
import { Attendance } from "../../db/models/Attendance";
import { Instruction } from "../../db/models/Instruction";
import Person from "../../db/models/Person";
import { Course } from "../../db/models/Course";

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
      resolve: (parent) => `${parent.family} ${parent.level || ''}${parent.group || ''}`
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

    instructors: {
      type: new GraphQLList(PersonType),
      resolve: (parent: Course) => {
        const ids = parent.instructions.map(({teacherId}: Instruction) => teacherId);
        return Person.find({_id: ids}).sort({ "_private.sortParam": 1 });
      }
    },
    students: {
      type: new GraphQLList(PersonType),
      resolve: (parent: Course) => {
        const ids = parent.attendances.map(({studentId}: Attendance) => studentId);
        return Person.find({_id: ids}).sort({ "_private.sortParam": 1 });
      }
    }
  })
});