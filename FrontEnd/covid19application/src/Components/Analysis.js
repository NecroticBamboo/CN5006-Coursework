import React from 'react';
// import DataTable from './DataTable';
import BarChart from './BarChart';
import {getAllRecords} from '../BackEndAPI';


export default class Analysis extends React.Component{
                             
    constructor(props) {
        super(props);
        this.state = { 
			DeathsByState: [],
			DeathsByCounty: [],
			CasesByState: [],
			CasesByCounty: [],
			Covid19Data: []
		};
    };

    componentDidMount(){
        getAllRecords()
        .then(res => {
            console.log("Get all records triggered");
			
            this.setState({
				DeathsByState:  this.prepareChart( res.data, x => x.state,  x => x.deaths ),
				DeathsByCounty: this.prepareChart( res.data, x => x.county, x => x.deaths ),
				CasesByState:   this.prepareChart( res.data, x => x.state,  x => x.cases ),
				CasesByCounty:  this.prepareChart( res.data, x => x.county, x => x.cases ),
				Covid19Data: res.data
			});
        }).catch(function (error) {
            console.log(error);
        });
    }

	prepareChart( data, keySelector, valueSelector ) {

		// select distinct states and sort them alphabelicaly
		var states = [...new Set(data.map( (row, i ) => keySelector(row) ))];
		states.sort();
		
		// initializes deaths array
		var deaths = new Array(states.length);
		for ( var i = 0; i < states.length; i++ ) {
			deaths[i] = { 
				label : states[i],
				value : 0
			};
		}
		
		// create statename -> position within array index for faster access
		var stateIndex = {};
		for ( i = 0; i < states.length; i++ ) {
			stateIndex[states[i]] = i;
		}
			
		data.forEach( row => {
			deaths[ stateIndex[keySelector(row)] ].value += valueSelector(row);
		} );
			
		// compare in reverse order
		function compare( a, b ) {
			if ( a.value < b.value ){
				return 1;
			}
			if ( a.value > b.value ){
				return -1;
			}
			return 0;
		}			
		
		// sort descending
		deaths.sort( compare );
			
		return deaths;
	}
	
	prepareCasesChart( data ) {
		return this.prepareChart( data, x => x.state, x => x.cases );
	}
	
    render() {
		
		console.log(this.state.ChartData);
		
        return (
			<div>
				<p>Total deaths: { this.state.Covid19Data.map(x => x.deaths).reduce((a, b) => a + b, 0) }</p>
				<div>
					<BarChart data={this.state.DeathsByState} title="Deaths" color="#70CAD1" />
				</div>
				<div>
					<BarChart data={this.state.DeathsByCounty} title="Deaths" color="#70CAD1" />
				</div>
				<p>Total cases: { this.state.Covid19Data.map(x => x.cases).reduce((a, b) => a + b, 0) }</p>
				<div>
					<BarChart data={this.state.CasesByState} title="Cases" color="#70CAD1" />
				</div>
				<div>
					<BarChart data={this.state.CasesByCounty} title="Cases" color="#70CAD1" />
				</div>
			</div>
        );
    }

}