#! /usr/bin/env node

"use strict";

/*
    If you don't have package minimist, its help us with parssing rules 
    and we will use it as function to get the parssing array

    First argument will be the array that will parse
    Second argument that will be an object a configuration of how types of values must be 
*/
var args = require("minimist")(process.argv.slice(2), {
    boolean :   ["help"],
    string  :   ["file"]
});

console.log(args);

// printHelp();

/***************************************** */

function        printHelp(){
    console.log("ex2 usage: ");
    console.log("----- ex2.js ---- Help --------");
    console.log("");
    console.log("-- help : print this help");
}

/***************************************** */