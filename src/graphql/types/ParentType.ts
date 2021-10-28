import { GraphQLObjectType, GraphQLString } from "graphql";
import { Person } from "../../db/models/Person";

export default new GraphQLObjectType({
  name: 'Parent',
  fields: () => ({
    christianName: { type: GraphQLString },
    fullName: { type: GraphQLString },
    fullChristianName: {
      type: GraphQLString,
      resolve: (parent: Person) => {
        return `${parent.christianName} ${parent.fullName}`.trim();
      }
    },
    phone: { type: GraphQLString }
  })
});