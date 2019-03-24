/**
 * 🌩Dreamy Jy🌩 back at it again⚡️...
 * 
 * This version of the api was developed👨🏿‍💻 by Dreamy Jy🕺🏿 at HackRPI 2019.
 * 
 * __Possible Improvements:__
 * - Separate everything into different files
 * - Add variables to queries
 * - Remove majic values
 * - Create Unit Test
 * - make the main function more elegent, in its handleing of async actions on db.
 * - give this program a development mode.
 */

console.log("Dreamy Jy🕺 says hey👋.\n\n"); // TODO: @delete

const sqlite3 = require('sqlite3').verbose();

let database = new sqlite3.Database('./database/database.db', _dbConnectionCallback);

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS workouts (
        workout_id INTEGER PRIMARY KEY UNIQUE NOT NULL,
        datatime TEXT NOT NULL,
        exercises TEXT NOT NULL
    );
`;

const insertData = `
    INSERT INTO workouts (datatime, exercises)
    VALUES(DATETIME('now'), $exercise);
`;

const getAllDataQuery = `
    SELECT * FROM workouts
`;

function _dbConnectionCallback(error) {
    if(error) {
        console.error(error.message);
    } else {
        console.log("Dreamy Jy🕺: I've created or opened the DB!\n");
    }
}

function _dbCloseCallback(error) {
    if(error) {
        console.error(error.message);
    } else {
        console.log("Dreamy Jy🕺: I've closed the DB!\n");
    }
}

function _createTableCallBack(error) {
    if(error) {
        console.error(error.message);
    } else {
        console.log("Dreamy Jy🕺: I've created a table🍽 in the database💾!\n");
        main();
    }
}

function _insertDataCallBack(error) {
    if (error) {
        console.error(error.message);
    } else {
        console.log("Dreamy Jy🕺: I've created a row🚣‍ in the database💾 table🍽!\n");
    }
}

function _getAllDataCallBack(error, data) {
    if (error) {
        console.error(error.message);
    } else {
        console.log("Dreamy Jy🕺: Here's the data: "+JSON.stringify(data, null, 2)+"\n");
    }
}
// ~~*~~.Logic Starts Here.~~*~~

//      Create Code to create table, if one does not exist


//create a database
database.run(createTableQuery, _createTableCallBack);

function main() {
    //add data
    database.run(insertData,{$exercise: "nothing of value"}, _insertDataCallBack);
    database.run(insertData,{$exercise: "another thing of no value"}, _insertDataCallBack);
    database.run(insertData,{$exercise: "some might say I have not value"}, _insertDataCallBack);
    database.run(insertData,{$exercise: "valueless valuables"}, _insertDataCallBack);

    database.all(getAllDataQuery, _getAllDataCallBack);
}

//get data from table
//database.get();

// Logic Ends here.
database.close(_dbCloseCallback);