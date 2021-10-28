import { GraphQLObjectType, GraphQLString } from "graphql";
import moment from "moment";

export default new GraphQLObjectType({
  name: 'Event',
  fields: () => ({
    date: { type: GraphQLString, resolve: (parent) => moment(parent.date).format('DD-MM-YYYY') },
    place: { type: GraphQLString }
  })
});