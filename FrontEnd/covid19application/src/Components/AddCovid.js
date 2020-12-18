import React, {useState} from 'react';
import axios from 'axios';

// const datejs = require("datejs");

const Covid_Form = () =>{
    const [state, setState] = useState({
    date: "",
    county: "",
    state: "",
    cases: 0,
    deaths: 0,
    })

    let url ="http://localhost:5000/"
    const handleChange = (e) =>{
        const value = e.target.value;

        setState({
            ...state,
            [e.target.name]: value,
        })
    }

    const onSubmit = (e) => {
        alert("Total deaths so far: " + state.deaths)
        e.preventDefault();
        const CovidData = {
            _id:"testId",
            date: Date.parseExact(state.date,"d/M/yyyy"),
            county:state.county,
            state:state.state,
            cases: state.cases,
            deaths:state.deaths
        }
        axios.post(url + "addNewRecord", CovidData)
        .then( res => console.log(res.data));
    }

    return(
        <div style ={{marginTop:12}} >
            <h1>Add Covid Data</h1>
            <form onSubmit ={onSubmit} method = "Post">
                <div className = "form-group">
                    <label>Date: </label>
                    <input className = "form-control" type="date" name = "date" value = {state.date} onChange = {handleChange}/>
                </div>
                 <div className = "form-group">
                    <label>County: </label>
                    <input className = "form-control" type="text" name = "county" value = {state.county} onChange = {handleChange}/>
                </div>

                {/* Use this version? */}

                 {/* <div className = "form-group">
                    <label>State: </label>
                    <input className = "form-control" type="text" name = "state" value = {state.state} onChange = {handleChange}/>
                </div> */}

                <div className = "form-group">
                    <label> Choose State: {" "}
                        <select className = "form-control"
                        name ="State" value = {state.state} onChange = {handleChange}>
                            <option value ="AL">Alabama</option>
                            <option value ="AK">Alaska</option>
                            <option value ="AS">American Samoa</option>
                            <option value ="AZ">Arizona</option>
                            <option value ="AR">Arkansas</option>
                            <option value ="CA">California</option>
                            <option value ="CO">Colorado</option>
                            <option value ="CT">Connecticut</option>
                            <option value ="DE">Delaware</option>
                            <option value ="DC">District of Columbia</option>
                            <option value ="FL">Florida</option>
                            <option value ="GA">Georgia</option>
                            <option value ="GU">Guam</option>
                            <option value ="HI">Hawaii</option>
                            <option value ="ID">Idaho</option>
                            <option value ="IL">Illinois</option>
                            <option value ="IN">Indiana</option>
                            <option value ="IA">Iowa</option>
                            <option value ="KY">Kentucky</option>
                            <option value ="LA">Louisiana</option>
                            <option value ="ME">Maine</option>
                            <option value ="MD">Maryland</option>
                            <option value ="MA">Massachusetts</option>
                            <option value ="MI">Michigan</option>
                            <option value ="MN">Minnesota</option>
                            <option value ="MS">Mississipi</option>
                            <option value ="MO">Missouri</option>
                            <option value ="MT">Montana</option>
                            <option value ="NE">Nebraska</option>
                            <option value ="NH">New Hampshire</option>
                            <option value ="NJ">New Jersey</option>
                            <option value ="NM">New Mexico</option>
                            <option value ="NY">New York</option>
                            <option value ="NC">North Carolina</option>
                            <option value ="ND">North Dakota</option>
                            <option value ="MP">Northern Mariana Islands</option>
                            <option value ="OH">Ohio</option>
                            <option value ="OK">Oklahoma</option>
                            <option value ="OR">Oregon</option>
                            <option value ="PA">Pennylvania</option>
                            <option value ="PR">Puerto Rico</option>
                            <option value ="RI">Rhode Island</option>
                            <option value ="SC">South Carolina</option>
                            <option value ="SD">South Dakota</option>
                            <option value ="TN">Tennessee</option>
                            <option value ="TX">Texas</option>
                            <option value ="UT">Utah</option>
                            <option value ="VT">Vermont</option>
                            <option value ="VA">Virginia</option>
                            <option value ="VI">Virgin Islands</option>
                            <option value ="WA">Washington</option>
                            <option value ="WV">West Virginia</option>
                            <option value ="WI">Wisconsin</option>
                            <option value ="WY">Wyoming</option>
                        </select>
                    </label>
                </div>


                 <div className = "form-group">
                    <label>Cases: </label>
                    <input className = "form-control" type="number" name = "cases" value = {state.cases} onChange = {handleChange}/>
                </div>
                 <div className = "form-group">
                    <label>Deaths: </label>
                    <input className = "form-control" type="number" name = "deaths" value = {state.deaths} onChange = {handleChange}/>
                </div>

                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default Covid_Form;