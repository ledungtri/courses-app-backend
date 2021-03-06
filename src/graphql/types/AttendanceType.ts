import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import PersonType from "./PersonType";
import CourseType from "./CourseType";

// @ts-ignore
export default new GraphQLObjectType({
  name: 'Attendance',
  // @ts-ignore
  fields: () => ({
    student: {type: PersonType},
    course: {type: CourseType},
    year: {type: GraphQLInt},
    result: {type: GraphQLString}
  })
});