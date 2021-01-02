import axios from 'axios';

let url ="http://localhost:5000/";

export function getAllRecords() {
    return axios.get(url+"getAllRecords");
}

export function deleteRecord(id) {
    return axios.post(url+"deleteRecord/"+id)
}

export function addRecord(CovidData) {
    return axios.post(url + "addNewRecord", CovidData);
}

export function getSpecificData(id) {
    return axios.get(url+"getSpecificRecord/"+ id)
}

export function updateRecord(id,CovidData){
    return axios.post(url+"/updateRecord/"+id,CovidData);
}