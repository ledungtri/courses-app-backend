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
        const ward = parent.ward? ', ' + parent.ward : '';
        const district = parent.district? ', ' + parent.district : '';
        return `${parent.streetNumber} ${parent.streetName}${ward}${district}`.trim();
      }
    }
  })
});