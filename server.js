const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const cors = require("cors");
const path = require("path");
// allow cross-corigin request
const app = express();
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.use(express.static("public")); // build public folder later
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});
app.listen(4000, () => {
  console.log("Now listening to port 4000");
});
