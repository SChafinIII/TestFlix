const { gql } = require('apollo-server-express');
const typeDefs = gql`
    type Movie {
        _id: ID!
        title: String!
        desc: String!
        img: String!
        imgTitle: String!
        imgThumb: String!
        trailer: String!
        video: String!
        year: String!
        limit: Int!
        genre: String!
        isSeries: Boolean!
    }

    type Query {
        getMovies: [Movie]
        getMovie(id: ID!): Movie
    }

    type Mutation {
        createMovie(title: String!, desc: String!, img: String!, imgTitle: String!, imgThumb: String!, trailer: String!, video: String!, year: String!, limit: Int!, genre: String!, isSeries: Boolean!): Movie!

        updateMovie(id: ID!, title: String!, desc: String!, img: String!, imgTitle: String!, imgThumb: String!, trailer: String!, video: String!, year: String!, limit: Int!, genre: String!, isSeries: Boolean!): Movie!

        deleteMovie(id: ID!): String! 

        getMovies(id: ID!): Movie

        getRandomMovie: Movie 
    }`;

module.exports = typeDefs;
