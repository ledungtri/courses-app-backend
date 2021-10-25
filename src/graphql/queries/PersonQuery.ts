import PersonType from "../types/PersonType";
import { GraphQLString } from "graphql";
import Person from "../../db/models/Person";

export default {
  type: PersonType,
  args: {
    id: { type: GraphQLString }
  },
  resolve: (_: any, args: any) => {
    return Person.findById(args.id);
  }
};