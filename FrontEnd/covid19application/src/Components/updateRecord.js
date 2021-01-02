import React, {setState, Component } from "react";
import { updateRecord, getSpecificData } from '../BackEndAPI';

export default class Covid_UpdateRecord extends Component{
        constructor(props) {
        super(props);

        let id = this.props.match.params.id;
        console.log("Constructor ID = "+id);

        this.state = {
            _id: id,
            date: this.formatDate(new Date()),
            county: "",
            state: "NY",
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
//            return ""+now.getFullYear()+"/"+this.pad(now.getMonth()+1,2)+"/"+now.getDate();
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
                <form onSubmit ={this.onSubmit} method = "Post">
                    <div className = "form-group">
                        <label>Date: </label>
                        <input className = "form-control" type="date" name = "date" value = {this.state.date} onChange = {this.handleChange}/>
                    </div>
                    <div className = "form-group">
                        <label>County: </label>
                        <input className = "form-control" type="text" name = "county" value = {this.state.county} onChange = {this.handleChange}/>
                    </div>

                    {/* Use this version? */}

                    {/* <div className = "form-group">
                        <label>State: </label>
                        <input className = "form-control" type="text" name = "state" value = {state.state} onChange = {handleChange}/>
                    </div> */}

                    <div className = "form-group">
                        <label>State: {" "}
                            <select className = "form-control"
                            name ="state" value = {this.state.state} onChange = {this.handleChange}>
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
                            </select>
                        </label>
                    </div>

                    <div className = "form-group">
                        <label>Cases: </label>
                        <input className = "form-control" type="number" name = "cases" value = {this.state.cases} onChange = {this.handleChange}/>
                    </div>
                    <div className = "form-group">
                        <label>Deaths: </label>
                        <input className = "form-control" type="number" name = "deaths" value = {this.state.deaths} onChange = {this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <center>
                            <div className="form-group">
                                <input type="submit" value="Update" className="btn btn-primary" />
                            </div>
                        </center>         
                    </div>
                
                </form>
            </div>
        )
    }
    
}
