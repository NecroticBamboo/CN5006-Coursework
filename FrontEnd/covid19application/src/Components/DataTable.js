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
                <td>
                    <button onClick={() => {this.props.editRow(data._id)}} className="button muted-button">
                        Edit
                    </button>
                </td>
                <td>
                    <button onClick={() => {this.props.deleteRow(data._id)}} className="button muted-button">
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
                                <td>Date</td>
                                <td>County</td>
                                <td>State</td>
                                <td>Cases</td>
                                <td>Deaths</td>
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