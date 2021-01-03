import React from 'react';
// import DataTable from './DataTable';
import BarChart from './BarChart';


export default class Analysis extends React.Component{
                             
    constructor(props) {
        super(props);
        this.state = {
			Covid19Data: props.data,
			DeathsByState  : [],
			CasesByState   : [],
		};
    };

	componentWillReceiveProps(nextProps) {
		var data = nextProps.data;

		this.setState(
		{ 
			Covid19Data    : data, 
			DeathsByState  : this.prepareChart( data, x => x.date,  x => x.deaths ),
			CasesByState   : this.prepareChart( data, x => x.date,  x => x.cases ),
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
			
			
		// --------- sorting ---------------
		/*
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
		*/	
		return deaths;
	}
	
    render() {
		
		var DeathsByState  = this.state.DeathsByState ;
		var CasesByState   = this.state.CasesByState  ;
		

        return (
			<div>
				<div class="m-3">Total deaths: { this.state.Covid19Data.map(x => x.deaths).reduce((a, b) => a + b, 0) }</div>
				<div class="m-3">
					<BarChart data={DeathsByState} title="Deaths" color="#70CAD1" chartType="line"/>
				</div>
				<div class="m-3">Total cases: { this.state.Covid19Data.map(x => x.cases).reduce((a, b) => a + b, 0) }</div>
				<div class="m-3">
					<BarChart data={CasesByState} title="Cases" color="#70CAD1" chartType="line" />
				</div>
			</div>
        );
    }

}