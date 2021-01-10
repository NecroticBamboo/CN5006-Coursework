import React from 'react';
import Chart from 'chart.js';

// https://www.createwithdata.com/react-chartjs-dashboard/

export default class BarChart extends React.Component {
	constructor(props) {
		super(props);
		this.canvasRef = React.createRef();
	}

	getMinMax( data ) {
		try {
			if ( typeof data === 'undefined' || data.length === 0 )
				return {
					min : 0,
					max : 100,
					values: []
				};
			  
			var values = data.map(d => d.value);
			var minValue = values[0];
			var maxValue = values[0];

			for ( var i = 0; i < values.length; i++ ) {
				if ( values[i] < minValue )
					minValue = values[i];
				if ( values[i] > maxValue )
					maxValue = values[i];
			}
			
			return {
				min : minValue,
				max : maxValue,
				values: values
			};
		}
		catch (err) {
			return {
				min : 0,
				max : 100,
				values: []
			};
		}
	}
	
	componentDidUpdate() {
		var minMax = this.getMinMax( this.props.data );

		this.myChart.config.options.scales.yAxes[0].ticks.min = minMax.min;
		this.myChart.config.options.scales.yAxes[0].ticks.max = minMax.max;

		this.myChart.data.labels = this.props.data.map(d => d.label);
		this.myChart.data.datasets[0].data = minMax.values;
		this.myChart.update();
	}

	componentDidMount() {
		var minMax = this.getMinMax( this.props.data );

		this.myChart = new Chart(this.canvasRef.current, {
		  type: this.props.chartType,
		  options: {
			maintainAspectRatio: false,
			scales: {
			  yAxes: [
				{
				  ticks: {
					min: minMax.min,
					max: minMax.max
				  }
				}
			  ]
			}
		  },
		  data: {
			labels: this.props.data.map(d => d.label),
			datasets: [{
			  label: this.props.title,
			  data: minMax.values,
			  backgroundColor: this.props.color
			}]
		  }
		});
  }

  render() {
    return (
        <canvas ref={this.canvasRef} />
    );
  }
}
