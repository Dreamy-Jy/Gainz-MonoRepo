/**
 * 🌩Dreamy Jy🌩 back at it again⚡️...
 * 
 * This version of the api was developed👨🏿‍💻 by Dreamy Jy🕺🏿 at HackRPI 2019.
 * 
 * __Possible Improvements:__
 * - Separate the Schema into different parts
 * - generate schema with objects?
 */
const { graphql, buildSchema } = require("graphql");
const sqlite3 = require("sqlite3").verbose();

const database = new sqlite3.Database("./database/database.db");


let schema = buildSchema(`
    type Query {
        allWorkouts: [Workout]!,
    }

    type Workout {
        datetime:  String!
        exercises: String!
    }
`);

let root = {
    allWorkouts: () => {
        return [{
            datetime: "hello",
            exercises: "hit that gym bro"
        }];
    }
};

graphql(schema, '{ allWorkouts { exercises } }', root).then((response) => {
    console.log(JSON.stringify(response, null, 2));
});