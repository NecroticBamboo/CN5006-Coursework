import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DataTable extends Component {
    render() {
        return (
            <tr>
                {/* <td>
                    {this.props.obj._id}
                </td> */}
                <td>
                    {this.props.obj.date}
                </td>
                <td>
                    {this.props.obj.county}
                </td>
                <td>
                    {this.props.obj.state}
                </td>
                <td>
                    {this.props.obj.cases}
                </td>
                <td>
                    {this.props.obj.deaths}
                </td>
                <td>
                    <Link to ={"/updateRecord/"+this.props.obj._id}>Update</Link>
                </td>
                <td>
                    <Link to ={"/getCasesAndDeaths/"+this.props.obj._id}>Get Cases and Deaths</Link>
                </td>
                <td>
                    <Link to ={"/deleteRecord/"+this.props.obj._id}>Delete</Link>
                </td>
            </tr>
        );
    }
}

export default DataTable;