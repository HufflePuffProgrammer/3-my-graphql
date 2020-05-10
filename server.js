const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
// allow cross-corigin request
const app = express();

console.log("MongoDB URI");
console.log(process.env.PORT);
console.log(process.env.MONGODB_URI);
mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://jeff:3M31GqcRIwyyal59@cluster0-kxigh.mongodb.net/test?retryWrites=true&w=majority"
);
// mongoose.connect(
//   "mongodb+srv://jeff:3M31GqcRIwyyal59@cluster0-kxigh.mongodb.net/test?retryWrites=true&w=majority",
//   { useNewUrlParser: true }
// );

mongoose.connection.once("open", () => {
  console.log("JEff connected to new mongoDB on web");
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
