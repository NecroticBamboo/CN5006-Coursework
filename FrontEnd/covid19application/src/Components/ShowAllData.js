import axios from 'axios';
import React, { Component } from 'react';
import DataTable from './DataTable';

let url ="http://localhost:5000/";

export default class showAllData extends Component{

    constructor(props) {
        super(props);
        this.state = { Covid19Data: [] };
    };

    componentDidMount(){
        axios.get("http://localhost:5000/getAllRecords", )
        .then(res => {
            console.log("Get all records triggered")
            this.setState({ Covid19Data: res.data });
        }).catch(function (error) {
            console.log(error);
        });
    }
     

    editRow(obj, id){
        
        // axios.put(url +" Update Covid record" + id)
        // .then(res => {
        // this.setState({items: res.data});
        // this.props.history.push('/items');
        // })
        // .catch(err => console.log(err));
    }

    deleteRow(obj, id){
        
        axios.post(url+"deleteRecord/"+id)
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

 
    LimitCovidData (id) {
        showAllData.find({})
        .filter(row => row._id !== id)
        .limit(20)
        .exec()
        .then(docs => {
                console.log("Showing multiple documents" + docs)
             
            })
            .catch( err => {
                console.error(err)
            }) 
           // return this.state.Covid19Data.filter(row => row._id !== id).map(function(currentcovid,i){
        //     console.log(" "+currentcovid + " "+i)
        //     .limit(20)
        //     return <showAllData covid = {currentcovid} key ={i}/>
        // })
    }

    

    render() {
        return (
            <DataTable limit = {y => this.LimitCovidData( y)} data={this.state.Covid19Data} editRow={ x => this.editRow(this, x) } deleteRow={ x => this.deleteRow(this, x) }/>
        )
    }

}

// export default showAllData;