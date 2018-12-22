const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNotNull
} = require("graphql");
const axios = require("axios");

// HARD CODED DATA
// const customers = [
//   { id: "1", name: "John Doe", email: "jdoe@gmail.com", age: 35 },
//   { id: "2", name: "Kelly James", email: "kellyjames@gmail.com", age: 28 },
//   { id: "3", name: "Skinny Pete", email: "skinnypete@gmail.com", age: 31 }
// ];

// CUSTOMER TYPE
const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

// ROOT QUERY
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        // for (let i = 0; i < customers.length; i++) {
        //   if (customers[i].id == args.id) {
        //     return customers[i];
        //   }
        // }

        return axios
          .get("http://localhost:3000/customers/" + args.id)
          .then(res => res.data);
      }
    }
    // customers: {
    //   type: new GraphQLList(CustomerType),
    //   resolve(parentValue, args) {
    //     return customers;
    //   }
    // }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
