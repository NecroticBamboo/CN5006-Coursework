let mongoose = require('mongoose');

const CovidInfo= new mongoose.Schema({
    _id: String,
    date: Date,
    county: String,
    state: String,
    cases: Number,
    deaths: Number
},{
    versionKey: false
});


module.exports = mongoose.model('covidModel',CovidInfo,'Covid19Data');