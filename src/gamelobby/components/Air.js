import React, { Component } from 'react';
var LineChart = require("react-chartjs").Line;

const socket = io.connect();
class Air extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      chartname: [ 'History', 'chart2' ],
      PM2_5: [5, 8, 9, 0, 9, 14, 20],
      SO2: [-2, -5, 0, -3, -1, 0, -1],
      nowHumidity: 0,
      nowTemperature: 0,
    };

    setInterval( () => {
        console.log('setinerval');
        this.state.PM2_5.splice( 0, 1 );
        this.state.PM2_5.push( this.state.nowHumidity );
        this.setState( { PM2_5: this.state.PM2_5 } );
        this.state.SO2.splice( 0, 1 );
        this.state.SO2.push( this.state.nowTemperature );
        this.setState( { SO2: this.state.SO2 } );
    } ,3600000 );

    socket.on( 'setHunmidity', nowHumidity => this.setState( { nowHumidity } ) ) ;
    socket.on( 'setTemperature', nowTemperature => this.setState( { nowTemperature } ) );

  }

  render() {
    var chartData =  {
            labels: [ "-7hr", "-6hr", "-5hr", "-4hr", "-3hr", "-2hr", "-1hr"  ],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: this.state.PM2_5
                },
                {
                    label: "My Second dataset",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: this.state.SO2
                }
            ]
    };

    const chartOptions = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    };

    const options = {
        responsive: false,
    };

    return (
      <div>
        <h3> Air Quality </h3>
        <span>
            <LineChart data={chartData} type = {'bar'} options = { options } width="600" height="250"/>
        </span>
        <div style = {{ margin: "3em"}}>
            <div style = {{ margin: "1em"}}>
                <span style = { { color: 'rgba(220,220,220,1)', background: 'rgba(220,220,220,1)' } }>11</span>
                <span> PM2_5 </span>
            </div>
            <div style = {{ margin: "1em"}}>
                <span style = { { color: 'rgba(151,187,205,1)', background: 'rgba(151,187,205,1)' } }>11</span>
                <span> SO2 </span>
            </div>
        </div>
        <div>
          <button type="button" className="btn btn-default"

            onClick = { () => this.props.back( 'menu' ) } > Back
          </button>
        </div>
      </div>
    );
  };
};


export default Air;
