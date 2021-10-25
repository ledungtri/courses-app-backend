import { GraphQLString } from "graphql";
import CourseType from "../types/CourseType";
import Course from "../../db/models/Course";

export default {
  type: CourseType,
  args: {
    id: { type: GraphQLString }
  },
  resolve: (_: any, args: any) => {
    return Course.findById(args.id);
  }
};