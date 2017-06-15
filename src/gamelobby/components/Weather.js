import React, { Component } from 'react';
var LineChart = require("react-chartjs").Line;

const socket = io.connect();
class Weather extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      chartname: [ 'History', 'chart2' ],
      humidity: [5, 8, 2, 0, 1, 2, 0],
      temperature: [-2, -5, 0, -3, -1, 0, -1],
      nowHumidity: 0,
      nowTemperature: 0,
      predictTemperatur: 'none',
      predictHumidity: 'none',
    };

    this.clearIntervalIdx =  setInterval( () => {
        console.log('setinerval');
        this.state.humidity.splice( 0, 1 );
        this.state.humidity.push( this.state.nowHumidity );
        this.setState( { humidity: this.state.humidity } );
        this.state.temperature.splice( 0, 1 );
        this.state.temperature.push( this.state.nowTemperature );
        this.setState( { temperature: this.state.temperature } );
        
    } ,3000 );
    console.log("this.clearIntervalIdx",this.clearIntervalIdx);
    socket.on( 'setHunmidity', nowHumidity => this.setState( { nowHumidity } ) ) ;
    socket.on( 'setTemperature', nowTemperature => this.setState( { nowTemperature } ) );

    fetch( '/predict' ).then( res => res.json() )
    .then( res => this.setState( { predictTemperatur: res.predictTemperatur, predictHumidity: res.predictHumidity } ) );
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
                    data: this.state.humidity
                },
                {
                    label: "My Second dataset",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: this.state.temperature
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
        <h3> Realtime monitor </h3>
        <span>
            <LineChart data={chartData} type = {'bar'} options = { options } width="600" height="250"/>
        </span>
        <div style = {{ margin: "3em"}}>
            <div style = {{ margin: "1em"}}>
                <span style = { { color: 'rgba(220,220,220,1)', background: 'rgba(220,220,220,1)' } }>11</span>
                <span> Humidity </span>
            </div>
            <div style = {{ margin: "1em"}}>
                <span style = { { color: 'rgba(151,187,205,1)', background: 'rgba(151,187,205,1)' } }>11</span>
                <span> Temperature </span>
            </div>
            <h4>
                <div>Whether of next hour:</div>
                <div>{`   predictHumidity: ${this.state.predictHumidity}`}</div>
                <div>{`   predictTemperatur: ${this.state.predictTemperatur}`}</div>
            </h4>
        </div>
        <div>
          <button type="button" className="btn btn-default"
            onClick = { () => {
                this.props.back( 'menu' );
    console.log("this.clearIntervalIdx",this.clearIntervalIdx);
                clearInterval( this.clearIntervalIdx ); 
            } } > Back
          </button>
        </div>
      </div>
    );
  };
};


export default Weather;
