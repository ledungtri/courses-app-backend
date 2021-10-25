import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import EventType from "./EventType";
import ParentType from "./ParentType";
import AddressType from "./AddressType";
import CourseType from "./CourseType";
import { Person } from "../../db/models/Person";
import { Instruction } from "../../db/models/Instruction";
import Course from "../../db/models/Course";
import { Attendance } from "../../db/models/Attendance";

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

    instructedCourses: {
      type: new GraphQLList(CourseType),
      resolve: (parent: Person) => {
        const ids = parent.instructions.map(({courseId}: Instruction) => courseId);
        return Course.find({_id: ids}).sort({ year: 1, "_private.sortParam": 1 });
      }
    },
    attendedCourses: {
      type: new GraphQLList(CourseType),
      resolve: (parent: Person) => {
        const ids = parent.attendances.map(({courseId}: Attendance) => courseId);
        return Course.find({_id: ids}).sort({ year: 1, "_private.sortParam": 1 });
      }
    }
  })
});