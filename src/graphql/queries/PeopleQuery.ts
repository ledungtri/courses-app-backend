import { GraphQLInt, GraphQLList } from "graphql";
import PersonType from "../types/PersonType";
import Person from "../../db/models/Person";

export default {
  type: new GraphQLList(PersonType),
  args: {
    attendingYear: {type: GraphQLInt},
    instructingYear: {type: GraphQLInt}
  },
  resolve: (_: any, args: any) => {
    const query: any = {};

    if (args.attendingYear) {
      query['attendances.year'] = args.attendingYear
    }

    if (args.instructingYear) {
      query['instructions.year'] = args.instructingYear
    }

    return Person.find(query).sort({ "_private.sortParam": 1 });
  }
};