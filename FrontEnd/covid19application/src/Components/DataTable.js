import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import updateRecord from './updateRecord'

class DataTable extends Component {
    renderRow(data) {
        const url = '/updateRecord/'+data._id;

        return (
            <tr>
                
                <td>
                    {data.date}
                </td>
                <td>
                    {data.county}
                </td>
                <td>
                    {data.state}
                </td>
                <td>
                    {data.cases}
                </td>
                <td>
                    {data.deaths}
                </td>
                    {/* <button onClick={() => {this.props.editRow(data._id)}}  id ="Button" className="muted-button">
                        Edit
                    </button> */}
                <td>    
                    <Link to={url} className="link-button">
                        Edit
                    </Link>
                    
                    <button onClick={() => {this.props.deleteRow(data._id)}} class="link-button">
                        Delete
                    </button>
                </td>
            </tr>
        );
    }

    renderBody(data) {
        return data.map((row, i) => {
            return this.renderRow(row);
        });
    }

    render() {
        return (
            <div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <td class="title-size">Date</td>
                                <td class="title-size">County</td>
                                <td class="title-size">State</td>
                                <td class="title-size">Cases</td>
                                <td class="title-size">Deaths</td>
                                <td class="title-size">Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderBody(this.props.data)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}

export default DataTable;