var express = require('express');
let CovidInfo=require('./Covid19Information');
let mongodbConnected=require('./MongoDBConnection');
const cors=require('cors');

var app=express();

var bodyParser=require("body-parser");
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

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

app.get('/getAllRecords',function(req,res){
    CovidInfo.find(function(err,info){
        if(err){
            console.log(err);
        } else {
            res.json(info);
        }
    });
});

app.post('/addNewRecord', async function(req,res){
    let newRecord= req.body;
    console.log("New Record: ",newRecord);
    
    // console.log("CovidInfo: ",CovidInfo);
    
    res = await CovidInfo.insertMany([newRecord]).then(todo=>{
        res.status(200).json({'Records': 'record added successfully'});
    }).catch(err=>{
        res.status(400).send('adding new record failed');
    })
});

app.post('/updateRecord/:state/:county',function(req,res){

});

app.post('/deleteRecord/:state/:county',function(req,res){

});

app.get('/showDeaths/:state/:county',function(req,res){

});

app.get('/get20Documents/:date/:state',function(req,res){

});

app.get('/getDeathsMore/:number',function(req,res){

});

app.get('/getComputerInfo',function(req,res){

});


app.listen(5000,function(){
    console.log("Server is running on the port 5000")
});