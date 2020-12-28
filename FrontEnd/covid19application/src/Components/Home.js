import React from 'react';
import Image from './images/precautions.jpg'


const Home = () =>{
    return(
    <div>
        <h1>Welcome to Covid Application Data</h1>
        <img src = {Image} width = "550" alt="Tips to prevent the spread of Covid"/>
    </div>
    );
}


export default Home