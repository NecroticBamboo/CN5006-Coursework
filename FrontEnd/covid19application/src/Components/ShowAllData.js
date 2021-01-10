import React, { Component } from 'react';
import DataTable from './DataTable';
import { getAllRecords,deleteRecord } from '../BackEndAPI';


export default class showAllData extends Component{
    constructor(props) {
        super(props);
        this.state = { Covid19Data: [] };
    };

    componentDidMount(){
        getAllRecords()
        .then(res => {
            console.log("Get all records triggered")
			
			this.setState({ 
				Covid19Data: res.data.map( x => { 
					return {
						...x,
						date: x.date.substring(0,10)
					};
				})
			});
				
        }).catch(function (error) {
            console.log(error);
        });
    }

    deleteRow(obj, id){
        
        deleteRecord(id)
        .then(res => {
            console.log("Deleted record with id: "+id);
            obj.setState({
                ...obj.state,
                Covid19Data: obj.state.Covid19Data.filter(row => row._id !== id),
            });

        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <DataTable data={this.state.Covid19Data} deleteRow={ x => this.deleteRow(this, x) }/>
        )
    }

}