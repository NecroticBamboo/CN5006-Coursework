import React, { Component } from 'react';
import { Form, Button } from "react-bootstrap";
import DataTable from './DataTable';
import { getCasesMore, deleteRecord } from '../BackEndAPI';


export default class getDeathsGreater extends Component{
    constructor(props){
        super(props);
        this.state={
            number: 0,
            Covid19Data: []
        };
    }

    handleChange(e){
        const value = e.target.value;
        console.log(e.target.name+" = "+value+" "+typeof value);
        // console.log(this);

        this.setState({
            ...this.state,
            [e.target.name]: value,
        });
    };

    onSubmit(e){
        e.preventDefault();
        getCasesMore(this.state.number)
        .then( records => {

            this.setState({
                ...this.state,
                Covid19Data: records.data.map( x => { 
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
                <h3>Cases greater than...</h3>
                    <Form onSubmit ={(e) => this.onSubmit(e)}>
                        <Form.Group controlId = "Cases">
                            <Form.Label>Number</Form.Label>
                            <Form.Control type = "number"  name ="number" value ={this.state.number} onChange ={ (e) => this.handleChange(e)} required/>
                        </Form.Group>
                        <Button variant="info" size="lg" block="block" type="submit">Refresh</Button>
                    </Form>
                    <DataTable data={this.state.Covid19Data} deleteRow={ x => this.deleteRow(this, x) }/>
            </div>
        );
    };
}