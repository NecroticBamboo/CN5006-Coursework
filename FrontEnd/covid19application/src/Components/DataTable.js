import React, { Component } from 'react';

class DataTable extends Component {
    renderRow(data) {
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
                 <button onClick={() => {this.props.editRow(data._id)}}  id ="Button"className="muted-button">
                        Edit
                    </button>
                 <button onClick={() => {this.props.deleteRow(data._id)}} id = "Button"className="muted-button">
                        Delete
                    </button>
                
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
                            <tr >
                                <td id = "title-size">Date</td>
                                <td id = "title-size">County</td>
                                <td id = "title-size">State</td>
                                <td id = "title-size">Cases</td>
                                <td id = "title-size">Deaths</td>
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