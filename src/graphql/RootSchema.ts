import { GraphQLObjectType, GraphQLSchema } from "graphql";
import CoursesQuery from "./queries/CoursesQuery";
import CourseQuery from "./queries/CourseQuery";
import PersonQuery from "./queries/PersonQuery";
import PeopleQuery from "./queries/PeopleQuery";


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    course: CourseQuery,
    courses: CoursesQuery,
    person: PersonQuery,
    people: PeopleQuery
  }
});

export default new GraphQLSchema({
  query: RootQuery
});