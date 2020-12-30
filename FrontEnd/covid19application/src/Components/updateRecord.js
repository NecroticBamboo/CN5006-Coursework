import React, {useEffect, useState } from "react";
import axios from 'axios';

// const updateRecord = () =>{
//     return(
//     <div>
//         <h1>This is the update page</h1>
//     </div>
//     );
// }

function Covid_UpdateRecord (props) {
       const [state, setState] = useState({
    date: new Date().toString("yyyy-MM-dd"),
    county: "",
    state: "NY",
    cases: null,
    deaths: null,
    })

      const [StatedLoaded, Set_StatedLoaded]=useState(false)
  let url= "http://localhost:5000/"
  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

useEffect(() => {
    axios.get('http://localhost:5000/getCovidData'+ props.match.params.id)
                .then(res => {
                    setState(res.data)
                }).catch( err => {
                    console.log("error has occurred")
                })
}, [])
useEffect(() => {
    if (state.length>0)
    Set_StatedLoaded(true)
 }, [state]);
const onSubmit=(e) =>
   { 
        e.preventDefault();
        const CovidData = {
            _id: state.date+"-"+state.county+"-"+state.state,
            date:state.date,
            county:state.county,
            state:state.state,
            cases: state.cases,
            deaths:state.deaths
        }
         axios.post(url+"upadateCovid/"+props.match.params.id, CovidData)
    .then(res => console.log(res.data));
   }
    return(
        <div style ={{marginTop:12}} >
      <h3> Update Covid data Id: {props.match.params.id}</h3>
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
                    <label>State: {" "}
                        <select className = "form-control"
                        name ="state" value = {state.state} onChange = {handleChange}>
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
                    <input className = "form-control" type="number" name = "cases" value = {state.cases} onChange = {handleChange}/>
                </div>
                 <div className = "form-group">
                    <label>Deaths: </label>
                    <input className = "form-control" type="number" name = "deaths" value = {state.deaths} onChange = {handleChange}/>
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

export default Covid_UpdateRecord



// export default updateRecord;