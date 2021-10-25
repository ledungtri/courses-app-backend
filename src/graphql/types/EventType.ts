import { GraphQLObjectType, GraphQLString } from "graphql";

export default new GraphQLObjectType({
  name: 'Event',
  fields: () => ({
    date: { type: GraphQLString },
    place: { type: GraphQLString }
  })
});