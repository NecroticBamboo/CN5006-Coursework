import React from 'react';
import { Link } from 'react-router-dom';

const Header = () =>{
    return(
        <header>
            <nav  class = "navigation-bar">
                
                <ul>
                    <li class="app-title "> Covid-19 Tracker</li>
                    <li ><Link   to='/'>Home</Link></li>
                    <li><Link  to='/addCovid'>Add Covid</Link></li>
                    <li><Link to='/getAllRecords'>Show all Data</Link></li>
                    {/* <li><Link to='/updateRecord'>Update Cases and Deaths</Link></li> */}
                    <li><Link to='/getCasesAndDeaths'>Get Number of Cases and Deaths</Link></li>
                    <li><Link to='/get20Documents'>Get 20 Documents</Link></li>
                    <li><Link to='/getDeathsGreater'>Deaths Greater Than</Link></li>
                    <li><Link to='/getComputerInfo'>Computer Information</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;