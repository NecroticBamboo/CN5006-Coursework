import React, { Component } from 'react';
import { Form, Button } from "react-bootstrap";
import DataTable from './DataTable';
import { get20Records, deleteRecord } from '../BackEndAPI';
import { renderStateSelector } from './AddCovid';

export default class get20Documents extends Component{
    constructor(props){
        super(props);
        this.state={
            date: "",
            state: "New York",
            Covid19Data: []
        };
    }
    
    handleChange(e){
        const value = e.target.value;
        console.log(e.target.name+" = "+value);
        // console.log(this);

        this.setState({
            ...this.state,
            [e.target.name]: value,
        });
    };

    onSubmit(e){
        e.preventDefault();
        get20Records(this.state.date,this.state.state)
        .then( records => {

			let top20=records.data;
            this.setState({
                ...this.state,
                Covid19Data: top20.map( x => { 
					return {
						...x,
						date: x.date.substring(0,10)
                    };
                })    
            })
        })
        .catch(function (error) {
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

    render(){
        return(
            <div>
                <h3>Get 20 documents</h3>
                    <Form onSubmit ={(e) => this.onSubmit(e)}>
                        <Form.Group controlId = "Date">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type = "date"  name ="date" value ={this.state.date} onChange ={ (e) => this.handleChange(e)}/>
                        </Form.Group>

                        <Form.Group controlId ="State">
                            <Form.Label>State</Form.Label>
                            {renderStateSelector(this.state, (e) => this.handleChange(e) )}
                        </Form.Group>
                        <Button variant="info" size="lg" block="block" type="submit">Refresh</Button>
                    </Form>
                    <DataTable data={this.state.Covid19Data} editRow={ x => this.editRow(this, x) } deleteRow={ x => this.deleteRow(this, x) }/>
            </div>
        );
    };
}