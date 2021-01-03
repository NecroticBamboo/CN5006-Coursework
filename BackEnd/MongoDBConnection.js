mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
const covidData = require ('./Covid19Information')

const MONGO_URI= 'mongodb://localhost:27017/covid_coursework';

mongoose.connect(MONGO_URI,{useUnifiedTopology:true,useNewUrlParser:true});
const db=mongoose.connection;

db.on('error',function(err){
    console.log('Error occured '+err);
});

db.once('connected',function(){
    console.log('Connected to  '+MONGO_URI);
});

module.exports=db;