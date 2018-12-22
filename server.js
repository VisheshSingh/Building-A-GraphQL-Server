const express = require("express");
const expressGraphQL = require("express-graphql");
const schema = require("./schema");

const app = express();
app.get(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("Server listening to port 4000...");
});
