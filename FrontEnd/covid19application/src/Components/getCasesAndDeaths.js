import React from 'react';
import Analysis from './Analysis';
import {getByStateAndCounty} from '../BackEndAPI';
import { Form, Button } from "react-bootstrap";
import { renderStateSelector } from './AddCovid';

export default class getCasesAndDeaths  extends React.Component{	

    constructor(props) {
        super(props);
        this.state = {
			state : "Washington",
			county : "Snohomish",
			Covid19Data: []
		};
    };

	handleChange(e){
        const value = e.target.value;
        
        console.log(e.target.name+": "+e.target.value);
        this.setState({
            ...this.state,
            [e.target.name]: value,
        })
    }	
	
    onSubmit(e){
        e.preventDefault();
        getByStateAndCounty(this.state.state,this.state.county)
        .then( records => {
            let rec=records.data;
            this.setState({
                ...this.state, 
                Covid19Data : rec.map( x => { return {...x, date : x.date.substring(0,10)} } )
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }
	
	
	render() {
		return(
			<div>
				<h1>Cases and deaths for a county and state</h1>

				<Form onSubmit ={(e) => this.onSubmit(e)}>
					<Form.Group controlId = "County">
						<Form.Label>County</Form.Label>
						<Form.Control type = "text"  name ="county" value ={this.state.county} onChange ={(e) => this.handleChange(e)}/>
					</Form.Group>

					<Form.Group controlId ="State">
						<Form.Label>State</Form.Label>
						{renderStateSelector(this.state, e => this.handleChange(e))}
					</Form.Group>
					<Button variant="info" size="lg" block="block" type="submit">Refresh</Button>
				</Form>
				
				<Analysis data={this.state.Covid19Data}/>
			</div>
			);
	}
}
