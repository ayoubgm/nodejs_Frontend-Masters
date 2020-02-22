#! /usr/bin/env node

"use strict";

/*
    Package path provides a way of working with directories and file paths

    Methods :
        basename : Returns The last part of a path
        resolve     : Resolve the specified paths into an absolute path
        join        : Joins the specified paths into one
        extname     : returns the file extension of a path
*/
var path = require("path");

/*

    fs package for File system

*/
var fs = require("fs");

var args = require("minimist")(process.argv.slice(2), {
    boolean :   ["help"],
    string  :   ["file"]
});

if (args.help){
    printHelp();
}
else if (args.file){
    process_file(path.resolve(args.file));
}
else{
    error("Incorrect usage", true);
}

function        error(msg, includeHelp = false){
    console.error(msg);
    if (includeHelp){
        console.log("");
        printHelp();
    }
}

function        process_file(filePath){
    var contents = fs.readFileSync(filePath, "utf8");
    process.stdout.write(contents);
}


function        printHelp(){
    console.log("ex2 usage: ");
    console.log("----- ex2.js ---- Help --------");
    console.log("");
    console.log("-- help                print this help");
    console.log("-- file={FILENAME}     process the file");
}