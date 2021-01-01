import axios from 'axios';
import React, { Component } from 'react';
import DataTable from './DataTable';
import {Redirect} from 'react-router-dom';
import Analysis from './Analysis';


let url ="http://localhost:5000/";


const getDeathsGreater = () =>{
    return(
    <div>
        <h1>This is the get deaths greater than a given number page</h1>

    </div>
    
    );
    
}

// const getDeathsGreater = (props) =>{

//     const getDeaths = props.match.params.deaths;

//     var deaths = 150;
//     axios.post(url +"Get deaths greater than "+ getDeaths)
//             .then( res => {
//                  return(
//                     <div>
//                         <h1>This is the get deaths greater than a given number page</h1>
//                         <p>Counties where number of deaths is greater than { deaths} { this.state.getDeaths.map(x => x.deaths).reduce((a, b) =>  a + b, 0) }</p>
//                         <Analysis/>
//                         |<DataTable/>
//                         <Redirect to ="getDeathsGreater"/>
//                     </div>
    
//     );
//  }).catch (err => {
//      return (
//          <div>
//              <p> There is an error of type {err}</p>
//          </div>
//      )
//  })
 
    
// }

export default getDeathsGreater;