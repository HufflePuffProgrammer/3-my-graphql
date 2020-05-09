const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
// allow cross-corigin request
const app = express();

mongoose.connect(
  "mongodb+srv://richard:st9gp0eS83NUqUn5@cluster0-kxigh.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

mongoose.connection.once("open", () => {
  console.log("connected to new mongoDB on web");
});

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://richard:<password>@cluster0-kxigh.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(PORT);
});
