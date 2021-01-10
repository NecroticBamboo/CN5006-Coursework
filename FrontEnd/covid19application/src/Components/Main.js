import React from 'react';
import{ Switch,Route } from 'react-router-dom';
import Home from './Home';
import AddCovid from './AddCovid';
import showAllData from './ShowAllData';
import Covid_UpdateRecord from './updateRecord';
import getCasesAndDeaths from './getCasesAndDeaths';
import get20Documents from './get20Documents';
import getCasesGreater from './getCasesGreater';
import ComputerInfo from './ComputerInfo';

const Main = () =>{
    return(
        
        <main>
            <Switch>
                <Route exact path='/' component={Home}/>
                {/* both /roster and /roster/:number begin with /roster */}
                <Route path='/addCovid' component={AddCovid}/>
                <Route path='/getAllRecords' component={showAllData}/>
                <Route path='/updateRecord/:id' component={Covid_UpdateRecord}/>
                <Route path='/getCasesAndDeaths' component={getCasesAndDeaths}/>
                <Route path='/get20Documents' component={get20Documents}/>
                <Route path='/getCasesGreater' component={getCasesGreater}/>
                <Route path='/ComputerInfo' component={ComputerInfo}/>
            </Switch>
        </main>
    );
}

export default Main;