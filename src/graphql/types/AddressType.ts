import { GraphQLObjectType, GraphQLString } from "graphql";

export default new GraphQLObjectType({
  name: 'Address',
  fields: () => ({
    streetNumber: { type: GraphQLString },
    streetName: { type: GraphQLString },
    ward: { type: GraphQLString },
    district: { type: GraphQLString },
    area: { type: GraphQLString },
    phone: { type: GraphQLString },
    fullAddress: {
      type: GraphQLString,
      resolve: (parent) => {
        if (!parent.streetName) {
          return '';
        }
        return `${parent.streetNumber} ${parent.streetName}${parent.ward? ', ' + parent.ward : ''}${parent.district? ', ' + parent.district : ''}`;
      }
    }
  })
});