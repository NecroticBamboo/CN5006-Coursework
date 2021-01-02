import React, {setState, Component } from "react";
import { updateRecord, getSpecificData } from '../BackEndAPI';
import { renderStateSelector } from './AddCovid';
import { Form, Button } from "react-bootstrap";

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
            console.log(res);
            this.setState({
                ...res.data,
                date: this.formatDate(new Date(res.data.date))
            });
            console.log(res.data.date + " = " + this.state.date + " --- " + typeof this.state.date);
        });
    }
    
    formatDate(now){
            console.log(now.getFullYear());
            console.log(now.getMonth());
            console.log(now.getDate());
            //return ""+now.getFullYear()+"/"+this.pad(now.getMonth()+1,2)+"/"+now.getDate();
            return ""+now.getDate()+"/"+this.pad(now.getMonth()+1,2)+"/"+now.getFullYear(); //error here
            // return "2021/01/01";
    }

    pad(num, size) {
        var s = "000000000" + num;
        return s.substr(s.length-size);
    }

    handleChange(e){
        const value = e.target.value;
        console.log(e.target.name+" = "+value);

        setState({
            ...this.state,
            [e.target.name]: value,
        });
    };

    onSubmit(e){ 
        const id = this.state.date+"-"+this.state.county+"-"+this.state.state;
        e.preventDefault();
        const CovidData = {
            _id: id,
            date: this.state.date,
            county: this.state.county,
            state: this.state.state,
            cases: this.state.cases,
            deaths: this.state.deaths
        }
        updateRecord(CovidData._id,CovidData)
        .then(res => console.log(res.data));
    }

    render(){
        let id=this.state._id;
        return(
            <div style ={{marginTop:12}} >
                <h3> Update Covid data Id: {id}</h3>
                <Form onSubmit ={this.onSubmit} method = "Post">
                    <Form.Group controlId="Date">
                        <label>Date: </label>
                        <input className = "form-control" type="date" name = "date" value = {this.state.date} onChange = {this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="County">
                        <label>County: </label>
                        <input className = "form-control" type="text" name = "county" value = {this.state.county} onChange = {this.handleChange}/>
                    </Form.Group>

                    {/* Use this version? */}

                    {/* <div className = "form-group">
                        <label>State: </label>
                        <input className = "form-control" type="text" name = "state" value = {state.state} onChange = {handleChange}/>
                    </div> */}

                    <Form.Group controlId="State">
                        <label>State: {" "}
                        {renderStateSelector(this.state,this.handleChange)}
                        </label>
                    </Form.Group>

                    <Form.Group controlId="Cases">
                        <label>Cases: </label>
                        <input className = "form-control" type="number" name = "cases" value = {this.state.cases} onChange = {this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="Deaths">
                        <label>Deaths: </label>
                        <input className = "form-control" type="number" name = "deaths" value = {this.state.deaths} onChange = {this.handleChange}/>
                    </Form.Group>
                    <Button variant="info" size="lg" block="block" type="submit">Update</Button>
                </Form>
            </div>
        )
    }
    
}
