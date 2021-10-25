import { GraphQLObjectType, GraphQLString } from "graphql";

export default new GraphQLObjectType({
  name: 'Address',
  fields: () => ({
    streetNumber: { type: GraphQLString },
    streetName: { type: GraphQLString },
    ward: { type: GraphQLString },
    district: { type: GraphQLString },
    area: { type: GraphQLString },
    phone: { type: GraphQLString }
  })
});