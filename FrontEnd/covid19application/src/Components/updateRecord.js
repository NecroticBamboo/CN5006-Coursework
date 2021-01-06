import React, { Component } from "react";
import { updateRecord, getSpecificData } from '../BackEndAPI';
import { Form, Button } from "react-bootstrap";
import { Banner } from "./Banner";

export default class Covid_UpdateRecord extends Component{
        constructor(props) {
        super(props);

        let id = this.props.match.params.id;
        console.log("Constructor ID = "+id);

        this.state = {
            _id: id,
            date: this.formatDate(new Date()),
            county: "",
            state: "New York",
            cases: null,
            deaths: null
        };
    };

    componentDidMount(){
        console.log("ComponentDidMount ID: "+this.state._id);
        getSpecificData(this.state._id).then(res =>{
            this.setState({
                ...res.data,
                date: this.formatDate(new Date(res.data.date))
            });
            console.log(res.data.date + " = " + this.state.date + " --- " + typeof this.state.date);
        });
    }
    
    formatDate(now){
        return ""+now.getDate()+"/"+this.pad(now.getMonth()+1,2)+"/"+now.getFullYear();
    }

	parseDate( date ) {
		var dmy = date.split("/");
		var d = new Date( dmy[2], dmy[1]-1, dmy[0] );
		return d;
	}
	
    pad(num, size) {
        var s = "000000000" + num;
        return s.substr(s.length-size);
    }

    handleChange(e){
        const value = e.target.value;
        console.log(e.target.name+" = "+value);

        this.setState({
            ...this.state,
            [e.target.name]: value,
        });
    };

    onSubmit(e){ 
        e.preventDefault();
        const id = this.state._id;
		
		console.log(id+" Date: "+this.state.date);
		
        const CovidData = {
            _id: id,
            date: this.parseDate(this.state.date),
            county: this.state.county,
            state: this.state.state,
            cases: this.state.cases,
            deaths: this.state.deaths
        };

        updateRecord(CovidData._id,CovidData)
        .then( res => {
			this.setState({
				...this.state,
				updatedAt: new Date()
			});
		});
    }

    render(){
        let id=this.state._id;

		let show = !(typeof this.state.updatedAt === "undefined");
		
        return(
            <div style ={{marginTop:12}} >
                <h3> Update Covid data Id: {id}</h3>
				
                <Form onSubmit={ (e) => this.onSubmit(e)}>
                    <Form.Group controlId="Date">
                        <label>Date: </label>
                        {/*<input className = "form-control" type="date" name = "date" value = {this.state.date} onChange = {this.handleChange}/>*/}
						<div class="pl-3">{this.state.date}</div>
                    </Form.Group>
                    <Form.Group controlId="County">
                        <label>County: </label>
                        {/*<input className = "form-control" type="text" name = "county" value = {this.state.county} onChange = {this.handleChange}/>*/}
						<div class="pl-3">{this.state.county}</div>
                    </Form.Group>
                    <Form.Group controlId="State">
                        <label>State:</label>
                        {/*renderStateSelector(this.state,this.handleChange)*/}
						<div class="pl-3">{this.state.state}</div>
                    </Form.Group>

                    <Form.Group controlId="Cases">
                        <label>Cases: </label>
                        <input className = "form-control" type="number" name = "cases" value={this.state.cases} onChange={(e) => this.handleChange(e)} required/>
                    </Form.Group>
                    <Form.Group controlId="Deaths">
                        <label>Deaths: </label>
                        <input className = "form-control" type="number" name = "deaths" value={this.state.deaths} onChange={(e) => this.handleChange(e)} required/>
                    </Form.Group>
                    <Button variant="info" size="lg" block="block" type="submit">Update</Button>
                </Form>
				<Banner show={show} updatedAt={this.state.updatedAt} text={"Last updated: "+this.state.updatedAt}/>
            </div>
        )
    }
    
}
