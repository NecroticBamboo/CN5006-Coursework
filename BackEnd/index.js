var express = require('express');
let CovidInfo=require('./Covid19Information');
let mongodbConnected=require('./MongoDBConnection');
const cors=require('cors');

const fs = require("fs");
const fastcsv = require("fast-csv");
const datejs = require("datejs");

let stream = fs.createReadStream("TestData.csv");
let csvData = [];

async function initCollection(csvData){
    console.log(csvData.length);

    await CovidInfo.deleteMany({});

    try {
        res = await CovidInfo.insertMany(csvData);
        console.log(`Inserted: multiple rows `);

        count = await CovidInfo.countDocuments();
        console.log("Total documents Count:",count);
    }
    catch (err) {
        console.log('An error occured '+err);
    }
};

let csvStream=fastcsv.parse().on("data",function(data){
    d = {
        _id: data[0]+"-"+data[1]+"-"+data[2],
        date: Date.parseExact(data[0],"d/M/yyyy"),
        county: data[1],
        state: data[2],
        cases: Number.parseInt(data[3]),
        deaths: Number.parseInt(data[4])
    };
    // console.log(d);
    csvData.push(d);

}).on("end",function(){
    csvData.shift();
    initCollection(csvData);
});

stream.pipe(csvStream);