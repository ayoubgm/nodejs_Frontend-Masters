#!/usr/bin/env node

"use strict"

var util = require("util");
var path = require("path");
var http = require("http");
var sqlite3 = require("sqlite3");
var staticAlias = require("node-static-alias");

const DB_PATH = path.join(__dirname, "my.db");
const WEB_PATH  = path.join(__dirname, "web");
const HTTP_PORT = 8090;

var delay = util.promisify(setTimeout);

var myDB = new sqlite3.Database(DB_PATH);
var SQL3 = {
    run (...args){
        return new Promise(function c(resolve, reject){
            myDB.run(...args, function onResult(err){
                if (err) reject(err);
                else resolve(this);
            });
        });
    },
    get: util.promisify(myDB.get.bind(myDB)),
    all: util.promisify(myDB.all.bind(myDB)),
    exec: util.promisify(myDB.exec.bind(myDB)),
};

var httpserv  = http.createServer(handleRequest);

main();

function main(){
    httpserv.listen(HTTP_PORT);
    console.log(`Listeen on httpss://localhost: ${HTTP_PORT}`);
}

async function handleRequest(req, res){
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Hello world");
}