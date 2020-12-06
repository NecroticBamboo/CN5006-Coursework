var express = require('express');
let CovidInfo=require('./Covid19Information');
let mongodbConnected=require('./MongoDBConnection');
const cors=require('cors');

const fs = require("fs");
const fastcsv = require("fast-csv");
const datejs = require("datejs");

let stream = fs.createReadStream("TestData.csv");
let csvData = [];

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

    console.log(csvData.length);

    CovidInfo.deleteMany({}).exec().then(insert=>{
        CovidInfo.insertMany(csvData,(err, res) => {
                if (err) {
                    console.log('An error occured '+err);
                } else {
                    console.log(`Inserted: multiple rows `);

                CovidInfo.countDocuments()
                .exec()
                .then(count =>{
                    console.log("Total documents Count:",count);
                }).catch(err =>{
                    console.log(err);
                });
            }
    }); 
})
});

stream.pipe(csvStream);

