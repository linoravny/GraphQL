var express = require('express');
var { graphqlHTTP: express_graphql } = require('express-graphql');
var { buildSchema } = require('graphql');

// GraphQL schema
var schema = buildSchema(`
    type Query {
      movie(id: Int!): Movie,
      movies(name: String): [Movie]
    },
    type Movie {
      id: Int
      name: String
      description: String
      url: String
    }
`);

var moviesData = [
    {
        id: 1,
        name: 'The Shawshank Redemption',
        description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
        url: 'https://en.wikipedia.org/wiki/The_Shawshank_Redemption'
    },
    {
        id: 2,
        name: 'The Godfather',
        description: 'An organized crime dynastys aging patriarch transfers control of his clandestine empire to his reluctant son.',
        url: 'https://en.wikipedia.org/wiki/The_Godfather'
    },
    {
        id: 3,
        name: 'The Dark Knight',
        description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
        url: 'https://en.wikipedia.org/wiki/The_Dark_Knight_(film)'
    },
    {
      id: 4,
      name: 'The Shawshank Redemption',
      description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
      url: 'https://en.wikipedia.org/wiki/The_Shawshank_Redemption'
    },
    {
      id: 5,
      name: 'The Shawshank Redemption',
      description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
      url: 'https://en.wikipedia.org/wiki/The_Shawshank_Redemption'
    }
];
 
var getMovie = function(args) { 
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


var root = {
  movie: getMovie,
  movies: getMovies
};

var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));


//Queries:
/*

1. get single movie:
query getSingleMovie($movieID: Int!) {
    movie(id: $movieID) {
        name
    }
}
VARIABLES:
{
  "movieID": 1
}
============
2. get movies by name
query getMoviesByName($movieName: String) {
    movies(name: $movieName) {
        id,
    		name
    }
}
VARIABLES:
{
   "movieName": "The Shawshank Redemption"
}
*/