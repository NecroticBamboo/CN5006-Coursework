import React from 'react';
import{ Switch,Route } from 'react-router-dom';
import Home from './Home';
import AddCovid from './AddCovid';
import showAllData from './ShowAllData';
import Covid_UpdateRecord from './updateRecord';
import getCasesAndDeaths from './getCasesAndDeaths';
import deleteRecord from './deleteRecord';
import get20Documents from './get20Documents';
import getDeathsGreater from './getDeathsGreater';
import getComputerInfo from './getComputerInfo';

const Main = () =>{
    return(
        
        <main>
            <Switch>
                <Route exact path='/' component={Home}/>
                {/* both /roster and /roster/:number begin with /roster */}
                <Route path='/addCovid' component={AddCovid}/>
                <Route path='/getAllRecords' component={showAllData}/>
                <Route path='/edit/:id' component={Covid_UpdateRecord}/>
                <Route path='/getCasesAndDeaths/:id' component={getCasesAndDeaths}/>
                <Route path='/deleteRecord/:id' component={deleteRecord}/>
                <Route path='/get20Documents' component={get20Documents}/>
                <Route path='/getDeathsGreater' component={getDeathsGreater}/>
                <Route path='/getComputerInfo' component={getComputerInfo}/>
            </Switch>
        </main>
    );
}

export default Main;