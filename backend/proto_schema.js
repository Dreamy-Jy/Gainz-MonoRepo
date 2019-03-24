/**
 * 🌩Dreamy Jy🌩 back at it again⚡️...
 * 
 * This version of the api was developed👨🏿‍💻 by Dreamy Jy🕺🏿 at HackRPI 2019.
 * 
 * __Possible Improvements:__
 * - Separate the Schema into different parts
 * - - Schema Object {type_Name}Schema.js
 * - - Resolvers file
 * - remove dependence a single database library
 * - - Abstract over the Database
 */

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList
} = require("graphql");

const WorkoutType = new GraphQLObjectType({
    name: 'Workout',
    fields: {
        datatime: { type: GraphQLString },
        exercises: { type: GraphQLString }
    }
});

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        allWorkouts: {
            type: new GraphQLList(WorkoutType),
            resolve: allWorkoutsResolver
        }
    }
});

const schema = new GraphQLSchema({
    query: queryType
});

function allWorkoutsResolver(obj, args, context, info) {
    return new Promise((resolve, reject) => {
        context.database.all('SELECT * FROM workouts', (error, data) => {
            if (!error) {
                resolve(data);
            } else {
                reject(error.message);
            } 
        });
    });
}

module.exports = {
    schema: schema
}
