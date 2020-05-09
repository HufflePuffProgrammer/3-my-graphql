const graphql = require("graphql");

const _ = require("lodash");
const Book = require("../modules/book");
const Author = require("../modules/author");

const {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = graphql;

// var books = [
//   { name: "The Cursed Child", genre: "fiction", authorid: "100", id: "1" },
//   { name: "Half-Blood", genre: "fiction", authorid: "100", id: "2" },
//   { name: "Chamber of Secrets", genre: "fiction", authorid: "100", id: "3" },
//   { name: "Bible", genre: "religion", authorid: "200", id: "4" },
//   { name: "Book of Psalms", genre: "religion", authorid: "200", id: "5" },
//   { name: "LoserThink", genre: "Motivation", authorid: "300", id: "6" },
//   { name: "Win Bigley", genre: "Motivation", authorid: "300", id: "7" },
//   { name: "Lean Forward", genre: "Business", authorid: "400", id: "8" },
// ];

// var authors = [
//   { name: "The multi-gazillionaire JK", age: "48", id: "100" },
//   { name: "St Peter", age: "2072", id: "200" },
//   { name: "Scott Dilbert Adams", age: "72", id: "300" },
//   { name: "Sheryl Sandberg", age: "54", id: "400" },
// ];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    //for author
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent);
        // return _.find(authors, { id: parent.authorid });
        return Author.findById(parent.authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    // books: {
    //   type: new GraphQLList(BookType),
    //   resolve(parent, args) {
    //     return _.filter(books, { authorid: parent.id });
    //   },
    // },
    // return Book.find({ authorId: parent.id });
    //},
    //},
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        //return _.find(books, { id: args.id });
        return Book.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        //return books;
        return Book.find({});
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        //return _.find(authors, { id: args.id });
        return Author.findById(args.id);
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        //return authors;
        return Author.find({});
      },
    },
  },
});
module.exports = new GraphQLSchema({
  query: RootQuery,
});
