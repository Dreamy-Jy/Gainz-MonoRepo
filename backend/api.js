/**
 * 🌩Dreamy Jy🌩 back at it again⚡...
 * 
 * This version of the api was developed👨🏿‍💻 by Dreamy Jy🕺🏿 at HackRPI 2019.
 * 
 * __Possible Improvements:__
 * - Create seperate functions for each reponse
 * - Make the API take request
 * - Give API Request Meta Data.
 * - Method for starting without a Database
 * 
 * __Lessons Learned:__
 * - there are some modules like the `graphql` module that need to be destructured before use. 
 */

const express = require('express');
const {graphql} = require('graphql');
const sqlite3 = require('sqlite3').verbose();
const graphqlHTTP = new require('express-graphql');  

const api = express();
const {schema} = require('./proto_schema.js');
const database = new sqlite3.Database('./database/database.db'); 

const port = 3000;

api.use('/api', graphqlHTTP({
        schema: schema,
        context: {database: database},
        pretty: true,
        graphiql: true
    })
);

api.get('/', (req, res) => res.send('Hi Welcome to the Gainz App API!!'))

api.listen(port, () => console.log(`Gainz App API listening on port ${port}!`))