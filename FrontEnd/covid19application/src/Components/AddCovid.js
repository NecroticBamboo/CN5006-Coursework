import React, {useState} from 'react';
import {addRecord} from '../BackEndAPI';
import { Form, Button } from "react-bootstrap";



// const datejs = require("datejs");

const Covid_Form = () =>{
    const [state, setState] = useState({
        date: new Date().toString("yyyy-MM-dd"),
        county: "",
        state: "New York",
        cases: null,
        deaths: null,
    })

    const handleChange = (e) =>{
        const value = e.target.value;
        
        console.log(e.target.name+": "+e.target.value);
        setState({
            ...state,
            [e.target.name]: value,
        })
    }

    const onSubmit = (e) => {
        // console.log(state.date);

        e.preventDefault();
        const CovidData = {
            _id: state.date+"-"+state.county+"-"+state.state,
            date:state.date,
            county:state.county,
            state:state.state,
            cases: state.cases,
            deaths:state.deaths
        }
        addRecord(CovidData);
    }

    // Alert

     const mySubmitHandler = (event) => {
    event.preventDefault();
    alert("You have successfully submitted data for " + state.county + " in "+ state.state +" !");
  }

  	let show = !(typeof state.addAt === "undefined");

    return(
        <div onSubmit = {mySubmitHandler} style ={{marginTop:12}} >
            <h3>Add Covid Data</h3>
            <Form onSubmit ={onSubmit} method = "Post">
                <Form.Group controlId = "Date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type = "date"  name ="date" value ={state.date}   onChange ={handleChange} required/>
                </Form.Group>

                <Form.Group controlId = "County">
                    <Form.Label>County</Form.Label>
                    <Form.Control type = "text"  name ="county" value ={state.county} onChange ={handleChange} required/>
                </Form.Group>

                <Form.Group controlId ="State">
                    <Form.Label>State</Form.Label>
                    {renderStateSelector(state,handleChange)}
                </Form.Group>
                <Form.Group controlId = "Cases">
                    <Form.Label>Cases</Form.Label>
                    <Form.Control type = "number"  name ="cases" value ={state.cases} onChange ={handleChange} required/>
                </Form.Group>
                   
                <Form.Group controlId = "Deaths">
                    <Form.Label>Deaths</Form.Label>
                    <Form.Control type = "number"  name ="deaths" value ={state.deaths} onChange ={handleChange} required/>
                </Form.Group>
                <Button  variant="info" size="lg" block="block" type="submit" style ={{fontFamily:'Comic Sans MS'}}>Add Covid </Button>
                
            </Form>
        </div>
    )
}

export function renderStateSelector(state,handleChange){
    return(
        <Form.Control as = "select"  name ="state" value ={state.state} onChange ={handleChange}>
            <option value ="Alabama">Alabama</option>
            <option value ="Alaska">Alaska</option>
            <option value ="American Samoa">American Samoa</option>
            <option value ="Arizona">Arizona</option>
            <option value ="Arkansas">Arkansas</option>
            <option value ="California">California</option>
            <option value ="Colorado">Colorado</option>
            <option value ="Connecticut">Connecticut</option>
            <option value ="Delaware">Delaware</option>
            <option value ="District of Columbia">District of Columbia</option>
            <option value ="Florida">Florida</option>
            <option value ="Georgia">Georgia</option>
            <option value ="Guam">Guam</option>
            <option value ="Hawaii">Hawaii</option>
            <option value ="Idaho">Idaho</option>
            <option value ="Illinois">Illinois</option>
            <option value ="Indiana">Indiana</option>
            <option value ="Iowa">Iowa</option>
            <option value ="Kentucky">Kentucky</option>
            <option value ="Louisiana">Louisiana</option>
            <option value ="Maine">Maine</option>
            <option value ="Maryland">Maryland</option>
            <option value ="Massachusetts">Massachusetts</option>
            <option value ="Michigan">Michigan</option>
            <option value ="Minnesota">Minnesota</option>
            <option value ="Mississipi">Mississipi</option>
            <option value ="Missouri">Missouri</option>
            <option value ="Montana">Montana</option>
            <option value ="Nebraska">Nebraska</option>
            <option value ="New Hampshire">New Hampshire</option>
            <option value ="New Jersey">New Jersey</option>
            <option value ="New Mexico">New Mexico</option>
            <option value ="New York">New York</option>
            <option value ="North Carolina">North Carolina</option>
            <option value ="North Dakota">North Dakota</option>
            <option value ="Northern Mariana Islands">Northern Mariana Islands</option>
            <option value ="Ohio">Ohio</option>
            <option value ="Oklahoma">Oklahoma</option>
            <option value ="Oregon">Oregon</option>
            <option value ="Pennylvania">Pennylvania</option>
            <option value ="Puerto Rico">Puerto Rico</option>
            <option value ="Rhode Island">Rhode Island</option>
            <option value ="South Carolina">South Carolina</option>
            <option value ="South Dakota">South Dakota</option>
            <option value ="Tennessee">Tennessee</option>
            <option value ="Texas">Texas</option>
            <option value ="Utah">Utah</option>
            <option value ="Vermont">Vermont</option>
            <option value ="Virginia">Virginia</option>
            <option value ="Virgin Islands">Virgin Islands</option>
            <option value ="Washington">Washington</option>
            <option value ="West">West Virginia</option>
            <option value ="Wisconsin">Wisconsin</option>
            <option value ="Wyoming">Wyoming</option>
        </Form.Control>
    );
}

export default Covid_Form;