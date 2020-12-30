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
        _id: data[0].replace(/\//g,".")+"-"+data[1]+"-"+data[2],
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
    CovidInfo.find(function(err,docs){
        if(err){
            console.log(err);
        } else {
            res.json(docs);
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

app.post('/updateRecord/:_id', async function(req,res){
    let id = req.params._id;
    let updatedRecord = new CovidInfo(req.body);

    res = await CovidInfo.findByIdAndUpdate(id,{
        date: updatedRecord.date,
        county: updatedRecord.county,
        state: updatedRecord.state,
        cases: updatedRecord.cases,
        deaths: updatedRecord.deaths
    }, function(err,docs){
        if(err){
            console.log(err);
        } else {
            res.status(200).json({'Records': 'record updated successfully'});
        }
    })
});

app.post('/deleteRecord/:_id',async function(req,res){
    let id = req.params._id;
    res= await CovidInfo.findByIdAndDelete(id,function(err,docs){
        if(err){
            console.log(err);
        } else {
            res.status(200).send('Record deleted');
        }
    })
});

app.get('/showDeaths/:state/:county',async function(req,res){
    let state = req.params.state;
    let county = req.params.county;

    res = await CovidInfo.find({state:state,county:county},function(err,docs){
        let deaths = 0;
        let cases = 0;

        for (let index = 0; index < docs.length-1; index++) {
            deaths=deaths+docs[index].deaths;
            cases=cases+docs[index].cases;
        }
        // console.log(deaths);
        // console.log(cases);
        
        res.json({deaths: deaths, cases: cases});
    })
});

app.get('/get20Documents/:date/:state',async function(req,res){
    let date = req.params.date;
    let state = req.params.state;

    res = await CovidInfo.find({date:date,state:state},function(err,docs){
        res.json(docs)
    }).limit(20);
});

app.get('/getDeathsMore/:number',async function(req,res){
    let number = req.params.number;

    res = await CovidInfo.find({deaths:{$gte:number}},function(err,docs){
        res.json(docs);
    })
});

app.get('/getComputerInfo',function(req,res){

});


app.listen(5000,function(){
    console.log("Server is running on the port 5000")
});