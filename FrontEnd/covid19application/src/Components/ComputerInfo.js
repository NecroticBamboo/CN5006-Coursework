import React from 'react';
import {getComputerInfo} from '../BackEndAPI';
const util=require('util');

export default class ComputerInfo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            info: "Loading"
        }
    }

    componentDidMount(){
        getComputerInfo().then(
            (info) => {
                this.setState({
                    ...this.state,
                    info: info.data
                })
            }
        )
    }

    render(){
        return(
            <div>
                <h3>Backend computer information</h3>
                <pre>{util.inspect(this.state.info,false,5)}</pre>
            </div>
        )
    }        
}