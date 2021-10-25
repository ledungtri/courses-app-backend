import { GraphQLObjectType, GraphQLString } from "graphql";

export default new GraphQLObjectType({
  name: 'Parent',
  fields: () => ({
    christianName: { type: GraphQLString },
    fullName: { type: GraphQLString },
    phone: { type: GraphQLString }
  })
});