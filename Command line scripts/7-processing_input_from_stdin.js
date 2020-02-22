#! /usr/bin/env node

"use strict";

var util  = require("util");
var path = require("path");
var fs = require("fs");
var getStdin = require("get-stdin");

var args = require("minimist")(process.argv.slice(2), {
    boolean :   ["help", "in"],
    string  :   ["file"]
});

if (args.help){
    printHelp();
}
else if (args.in || args._.includes("-")){
    getStdin().then(process_file).catch(error);
}
else if (args.file){
    fs.readFile(path.resolve(args.file), function onContents(err, contents){
        if (err){
            error(err.toString());
        }else{
            process_file(contents.toString());
        }
    });

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

function        process_file(contents){
    contents = contents.toString().toUpperCase();
    process.stdout.write(contents);
}


function        printHelp(){
    console.log("ex2 usage: ");
    console.log("----- ex2.js ---- Help --------");
    console.log("");
    console.log("-- help                print this help");
    console.log("-- file={FILENAME}     process the file");
    console.log("--in, -                process the standard in");
}