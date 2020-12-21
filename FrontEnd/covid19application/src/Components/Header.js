import React from 'react';
import { Link } from 'react-router-dom';

const Header = () =>{
    return(
        <header>
            <nav >
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/addCovid'>Add Covid</Link></li>
                    <li><Link to='/getAllRecords'>Show all data</Link></li>
                    {/* <li><Link to='/updateRecord'>Update Cases and Deaths</Link></li> */}
                    {/* <li><Link to='/getCasesAndDeaths'>Get Number of Cases and Deaths</Link></li> */}
                    <li><Link to='/get20Documents'>Get 20 Documents</Link></li>
                    <li><Link to='/getDeathsGreater'>Get Number of Deaths Greater Than</Link></li>
                    <li><Link to='/getComputerInfo'>Get Computer Information</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;