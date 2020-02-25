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
// var getStdin = require("get-stdin"); 
var util = require("util"); 

var parseArgs = require("minimist");
var args = parseArgs(process.argv.slice(2), {
    boolean: ["help", "in"],
    string: ["file"]
});

var BASE_PATH = path.resolve(
    process.env.BASE_PATH || __dirname
);

if (args.help){
    printHelp();
}else if(args.in){
    processFile(process.stdin);
}else if(args.file){
    let stream = fs.createReadStream(path.join(BASE_PATH, args.file));
    processFile(stream);
}
else{
    error("Incorrect usage !", true);
}

function        processFile(inStream){
    var outStream = inStream;
    var targetStream = process.stdout;
    outStream.pipe(targetStream);
    
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