import axios from 'axios';
import React, { Component } from 'react';

import DataTable from './DataTable';

export default class showAllData extends Component{

    constructor(props) {
        super(props);
        this.state = { Covid19Data: [] };
    };

    componentDidMount(){
        axios.get("http://localhost:5000/getAllRecords")
        .then(res => {
            console.log("Get all records triggered")
            this.setState({ Covid19Data: res.data });
        }).catch(function (error) {
            console.log(error);
        });
    }
    
    dataTable() {
        return this.state.Covid19Data.map((data, i) => {
            return <DataTable obj={data} key={i} />;
            // return <tr><td>Something</td></tr>;
        });

        // return <tr><td>Something</td></tr>;
    }

    render() {
        return (
            <div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <td>ID</td>
                                <td>Date</td>
                                <td>County</td>
                                <td>State</td>
                                <td>Cases</td>
                                <td>Deaths</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.dataTable()}
                            {/* <tr><td>Something</td></tr> */}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}

// export default showAllData;