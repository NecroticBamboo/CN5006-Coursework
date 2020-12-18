import React, { Component } from 'react';

class DataTable extends Component {
    render() {
        return (
            <tr>
                <td>
                    {this.props.obj._id}
                </td>
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
            </tr>
        );
    }
}

export default DataTable;