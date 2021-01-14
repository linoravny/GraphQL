var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

var moviesData = [
    {
        id: 1,
        name: 'Anthony Alicea',
        description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
        img: 'https://codingthesmartway.com/courses/understand-javascript/'
    },
    {
        id: 2,
        name: 'Anthony Alicea 2',
        description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
        img: 'https://codingthesmartway.com/courses/understand-javascript/'
    },
    {
        id: 3,
        name: 'Anthony Alicea',
        description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
        img: 'https://codingthesmartway.com/courses/understand-javascript/'
    }
];
 
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    movie(id: Int!): String
  },

  type Movie {
    id: Int
    name: String
    description: String
    img: String
  }

`);
 
var getMovie = function(args) { 
    return "getMovie execute!"
    var id = args.id;
    return moviesData.filter(movie => {
        return movie.id == id;
    })[0];
}

var getMovies = function(args) {
    if (args.name) {
        var name = args.name;
        return moviesData.filter(movie => movie.name === name);
    } else {
        return moviesData;
    }
}

// The root provides a resolver function for each API endpoint
var root = {
    movie: getMovie
};
 
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));


//Queries:
/*

1.
{
  query getMovie($movieId: Int!) {
    movie(id: $movieId) {
      name
    }
  }
}
VARIABLES:
{
  "movieId": 1
}
============

*/