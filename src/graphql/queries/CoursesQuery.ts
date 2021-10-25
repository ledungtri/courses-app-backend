import { GraphQLInt, GraphQLList } from "graphql";
import CourseType from "../types/CourseType";
import Course from "../../db/models/Course";

export default {
  type: new GraphQLList(CourseType),
  args: {
    year: {type: GraphQLInt}
  },
  resolve: (_: any, args: any) => {
    const query = (args.year) ? { year: args.year } : {};
    return Course.find(query).sort({ year: 1, "_private.sortParam": 1 });
  }
};