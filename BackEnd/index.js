var express = require('express');
var os=require("os");

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

let shouldInit = true;

if ( shouldInit ) {
		
	let stream = fs.createReadStream("Coviddata.csv");
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
}

app.get('/getAllRecords',function(req,res){
    CovidInfo.find(function(err,docs){
        if(err){
            console.log(err);
        } else {
            res.json(docs);
        }
    });
});

app.get('/getSpecificRecord/:_id',function (req,res) {
    let id = req.params._id;
    // console.log("Mongo getSpecidicRecord ID: "+id);

    CovidInfo.findById(id,function (err,docs) {
        if(err){
            console.log(err);
        } else {
            // console.log("Mongo getSpecidicRecord Result: "+docs);
            res.json(docs);
        }
    })
})

app.post('/addNewRecord', async function(req,res){
    let newRecord= req.body;
    console.log("New Record: ",newRecord);
    
    // console.log("CovidInfo: ",CovidInfo);
    
    await CovidInfo.insertMany([newRecord]).then(todo=>{
        res.status(200).json({'Records': 'record added successfully'});
    }).catch(err=>{
        res.status(400).send('adding new record failed');
    })
});

app.post('/updateRecord/:_id', async function(req,res){
    let id = req.params._id;
    let updatedRecord = new CovidInfo(req.body);

    await CovidInfo.findByIdAndUpdate(id,{
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
    await CovidInfo.findByIdAndDelete(id,function(err,docs){
        if(err){
            console.log(err);
        } else if(res !== null){
            res.status(200).send('Record deleted');
        }
    })
});

app.get('/getDeathsAndCases/:state/:county',async function(req,res){
    let state = req.params.state;
    let county = req.params.county;

    var pipeline = [
        {
          '$match': {
            'state': state, 
            'county': county
          }
        }, {
          '$group': {
            '_id': {
              'state': '$state', 
              'county': '$county'
            }, 
            'deaths': {
              '$sum': '$deaths'
            }, 
            'cases': {
              '$sum': '$cases'
            }
          }
        }
      ];

    await CovidInfo.aggregate(pipeline ,function(err,docs){
        res.json({deaths: docs[0].deaths, cases: docs[0].cases});
    })
});

app.get('/get20Documents/:date/:state',async function(req,res){
    let date = Date.parse(req.params.date);
    let state = req.params.state;
    
    await CovidInfo.find({date:date,state:state},function(err,docs){
        res.json(docs)
    }).limit(20);
});

app.get('/getByStateAndCounty/:state/:county',async function(req,res){
    let county = req.params.county;
    let state = req.params.state;
    
    await CovidInfo.find({county:county,state:state},function(err,docs){
        res.json(docs)
    });
});

app.get('/getCasesMore/:number',async function(req,res){
    let number = parseInt(req.params.number,10);

    await CovidInfo.find({cases:{$gt:number}},function(err,docs){
        res.json(docs);
    })
});

app.get('/getComputerInfo',function(req,res){

    res.json({
        tempDir: os.tmpdir(),
        hostname: os.hostname(),
        os: os.platform(),
        uptime: os.uptime()/3600,
        userInfo: os.userInfo(),
        memory: os.totalmem()/1000000000,
        freemem: os.freemem()/1000000000,
        CPU: os.cpus(),
        Network: os.networkInterfaces()
    });
});


app.listen(5000,function(){
    console.log("Server is running on the port 5000")
});