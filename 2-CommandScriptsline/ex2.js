#!/usr/bin/env node

/*
    Second part includes :
        * Settings up a comandline script
        *  command line arguments
        * Argument Handling

*/

"use strict"

var path = require("path");
var fs = require("fs");
var getStdin = require("get-stdin"); 
var util = require("util"); 

var parseArgs = require("minimist");
var args = parseArgs(process.argv.slice(2), {
    boolean: ["help", "in"],
    string: ["file"]
});

if (args.help){
    printHelp();
}else if(args.in){
    getStdin().then(processFile).catch(error);
}else if(args.file){
    fs.readFile(path.resolve(args.file), function onContents(err, contents){
        if (err)
            error(err.toString());
        else{
            processFile(contents.toString());
        }
    });
}
else{
    error("Incorrect usage !", true);
}

function        processFile(contents){
    contents = contents.toUpperCase();
    process.stdout.write(contents);
    
}

function printHelp(){
    console.log("----- ex2 Help -----");
    console.log(" ./ex1.js --file{FILENAME}");
    console.log("");
    console.log("1-> --help                 print help ex2.");
    console.log("1-> --file={FILENAME}      process the file.");
    console.log("1-> --in                  process stdin.");
}

function error(msg, includeHelp=flase){
    console.log(msg);
    if (includeHelp){
        console.log("");
        printHelp();
    }
}