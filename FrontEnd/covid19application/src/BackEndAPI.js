import axios from 'axios';

let url ="http://localhost:5000/";

export function getAllRecords() {
    return axios.get(url+"getAllRecords");
}

export function getSpecificData(id) {
    return axios.get(url+"getSpecificRecord/"+ id)
}

export function addRecord(CovidData) {
    return axios.post(url + "addNewRecord", CovidData);
}

export function updateRecord(id,CovidData){
    return axios.post(url+"updateRecord/"+id,CovidData);
}

export function deleteRecord(id) {
    return axios.post(url+"deleteRecord/"+id)
}

export function get20Records(date,state){
    return axios.get(url+"get20Documents/"+date+"/"+state);
}

export function getByStateAndCounty(state, county){
    return axios.get(url+"getByStateAndCounty/"+state+"/"+county);
}

export function getCasesMore(number){
    return axios.get(url+"getCasesMore/"+number);
}

export function getComputerInfo(){
    return axios.get(url+"getComputerInfo");
}
