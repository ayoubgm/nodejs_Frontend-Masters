#! /usr/bin/env node

"use strict";

var path = require("path");
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
    fs.readFile(filePath, function onContents(err, contents){
        if (err){
            error(err.toString());
        }else{
            process.stdout.write(contents);
        }
    });
}


function        printHelp(){
    console.log("ex2 usage: ");
    console.log("----- ex2.js ---- Help --------");
    console.log("");
    console.log("-- help                print this help");
    console.log("-- file={FILENAME}     process the file");
}