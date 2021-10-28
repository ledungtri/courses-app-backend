import { GraphQLList } from "graphql";
import PersonType from "../types/PersonType";
import Person from "../../db/models/Person";

export default {
  type: new GraphQLList(PersonType),
  resolve: () => {
    return Person.find().sort({ "_private.sortParam": 1 });
  }
};