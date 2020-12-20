import React from 'react';
import{ Switch,Route } from 'react-router-dom';
import Home from './Home'
import AddCovid from './AddCovid'
import showAllData from './ShowAllData'

const Main = () =>{
    return(
        
        <main>
            <Switch>
                <Route exact path='/' component={Home}/>
                {/* both /roster and /roster/:number begin with /roster */}
                <Route path='/addCovid' component={AddCovid}/>
                <Route path='/getAllRecords' component={showAllData}/>
            </Switch>
        </main>
    );
}

export default Main;