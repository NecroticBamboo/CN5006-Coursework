import React from 'react';
import { Form, Button } from "react-bootstrap";
import DataTable from './DataTable';
import {getDeathsMore} from '../BackEndAPI';

export default class getDeathsGreater extends React.Component{
    constructor(props){
        super(props);
        this.state={
            deaths: null,
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
        getDeathsMore(this.state.deaths)
        .then( records => {

			let deathsGreater=records.data;
            this.setState({
                ...this.state,
                Covid19Data: deathsGreater.map( x => { 
					return {
						...x,
						death: x.death.substring(0,10)
                    };
                })    
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render(){
        return(
            <div>
                <h3>Showing deaths greater than {this.state.deaths}</h3>
                    <Form onSubmit ={(e) => this.onSubmit(e)}>
                        

                      <Form.Group controlId = "Deaths">
                        <Form.Label>Deaths</Form.Label>
                        <Form.Control type = "number"  name ="deaths" value ={this.state.deaths} onChange ={ (e) =>this.handleChange(e)}/>
                    </Form.Group>
                        <Button variant="info" size="lg" block="block" type="submit">Show Results</Button>
                    </Form>
                    <DataTable data={this.state.Covid19Data} />
                    
            </div>
        );
    };
}

