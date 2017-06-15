import React, { Component } from 'react';
import './History.css';
const LineChart = require( 'react-chartjs' ).Line;
const socket = io.connect();

class History extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      commodityNames: [],
      showFlag: [true,true,true],
      datas: {}, // datas = {name:[],time:[]}
      chartname: [ 'Histsory', 'chart2' ],
      humidity: [ 5, 8, 2, 0, 1, 2, 0 ],
      temperature: [ -2, -5, 0, -3, -1, 0, -1 ],
      nowHumidity: 0,
      nowTemperature: 0,
      predictTemperatur: 'none',
      predictHumidity: 'none',
      timeScale: 1, // 1 mean hour
      rawDatas: [],
      datas: [
        [ 10000, 3, 5, 8, 2, 0, 1, 2, 0 ,4, 7, 9, 10 ,20],
        [ -2, -5, 0, -3, -1, 0, -1, 3, 4, 7, 2, 5 ],
        [ -1, -3, 8, 3, 1, 0, 2, 2, 6, -2, -4, -5 ]
      ],
      datasets:[{
                    label: "coke",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [ 1, 3, 5, 8, 2, 0, 1, 2, 0 ,4, 7, 9, 10 ,20]
                },
                {
                    label: "7up",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [ 0,0,0,0,0,0,0, -5, 0, -3, -1, 0, -1 ]
                },
                {
                    label: "apple juice",
                    fillColor: "rgba(179,225,172,0.2)",
                    strokeColor: "rgba(179,225,172,1)",
                    pointColor: "rgba(179,225,172,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(179,225,172,1)",
                    data: [ -1, -3, 8, 3, 1, 0, 2 ]
                }],
    };
    socket.on( 'setHunmidity', nowHumidity => this.setState( { nowHumidity } ) ) ;
    socket.on( 'setTemperature', nowTemperature => this.setState( { nowTemperature } ) );
    socket.on( 'setTrade',() => {
      fetch( '/getCommodityDatas' )
        .then( res => res.json() )
        .then( res => {
          console.log('res.datas:',res.datas);
          this.setState( { rawDatas: res.datas } );
      } );
    } );
  }

  setFlag = i => {
    this.state.showFlag[i] = !this.state.showFlag[i];
    this.setState({showFlag:this.state.showFlag});
  };

  getLabels = () => {
    let labels = [];
    for( let i = 9; i != -1; --i )
      labels.push(new Date((new Date()).getTime()-3600000*this.state.timeScale*i));
    for( let i = 9; i != -1; --i )
    {
      new Date(new Date().getTime()-3600000*5*2).getHours();
      if (this.state.timeScale == 1) {
        const D = ( new Date( ( new Date() ).getTime() - 3600000 * this.state.timeScale * i ) ).getHours();
        labels[ i ] = String( D ) + ':00';
      }
      else if (this.state.timeScale == 24) {
        const MM = ( new Date( ( new Date() ).getTime() - 3600000 * this.state.timeScale * i ) ).getMonth();
        const DD = ( new Date( ( new Date() ).getTime() - 3600000 * this.state.timeScale * i ) ).getDate();
        labels[ i ] =  MM + '/' + DD;
      }
      if (this.state.timeScale > 24) {
        const MM = ( new Date( ( new Date() ).getTime() - 3600000 * this.state.timeScale * i ) ).getMonth();
        const YY = ( new Date( ( new Date() ).getTime() - 3600000 * this.state.timeScale * i ) ).getFullYear();
        labels[ i ] =  YY + '/' + MM;
      }
    }
    return labels;
  }

  renderChart = () => {
    for (let i = 0; i < this.state.datasets.length; ++i ) {
      if ( this.state.showFlag[ i ] ) {
        this.state.datasets[ i ].data = this.state.datas[ i ];
      }
      else {
        this.state.datasets[ i ].data = [-10,-10,-10,-10,-10,-10,-10,-10,-10,-10];
      }
    }
    const chartData =  {
      labels: this.getLabels(),
      datasets: this.state.datasets,
    };
    const chartOptions = {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true
              }
          }],
          xAxes: [{
              time: {
                  unit: 'month'
              }
          }]

      },
      responsive: true,
    };
    return  <div>
      <LineChart data={chartData} type = {'bar'} options = { chartOptions } width="600" height="250"/>
    </div>;
  }

  setTimeScale = timeScale => {
      // labels.push(new Date((new Date()).getTime()-3600000*this.state.timeScale*i));
    let time = [];
    let datas = [[],[],[]];
    for ( let i = 0; i < 10;  i++ ) {
      time.push( String( new Date( new Date().getTime() - 3600000 * timeScale * i ) ) );
      datas[0].push(0);
      datas[1].push(0);
      datas[2].push(0);
    }
    for ( let i = 0; i < 3; ++i ) {
      this.state.rawDatas.time[i].forEach( t => {
        console.log(t);
        for(let j = 0; j < time.length; ++j ) {
          if ( new Date( t ) > new Date( time[ j ] ) ) {
            console.log('\n',i,j);
            datas[i][j-1] += 1;
            break;
          }
        }
      } );
    }

    this.setState({timeScale,datas});
  }

  render() {

    const options = {
    };

    return (
      <div>
        <h3> { 'History' }</h3>
        <span>
            {this.renderChart()}
        </span>
        <div style = {{ margin: "3em"}} className = "twoSide">
            <div style = {{ margin: "1em"}}>
                <span style = { { color: 'rgba(220,220,220,1)', background: 'rgba(220,220,220,1)' } }>11</span>
                <span onClick = { () => this.setFlag(0) }> coke </span>
            </div>
            <div style = {{ margin: "1em"}}>
                <span style = { { color: 'rgba(151,187,205,1)', background: 'rgba(151,187,205,1)' } }>11</span>
                <span onClick = { () => this.setFlag(1) }> 7up </span>
            </div>
            <div style = {{ margin: "1em"}}>
                <span style = { { color: 'rgba(179,225,172,1)', background: 'rgba(179,225,172,1)' } }>11</span>
                <span onClick = { () => this.setFlag(2) }> apple juice </span>
            </div>

        </div>
        <div style = {{ margin: "3em"}} className = "twoSide">
            <div style = {{ margin: "1em"}}>
                <span style = { { color: 'rgba(220,220,220,1)', background: 'rgba(220,220,220,1)' } }>11</span>
                <span onClick = { () => this.setTimeScale( 1 ) }> Hours </span>
            </div>
            <div style = {{ margin: "1em"}}>
                <span style = { { color: 'rgba(151,187,205,1)', background: 'rgba(151,187,205,1)' } }>11</span>
                <span onClick = { () => this.setTimeScale( 24 ) }> Days </span>
            </div>
            <div style = {{ margin: "1em"}}>
                <span style = { { color: 'rgba(179,225,172,1)', background: 'rgba(179,225,172,1)' } }>11</span>
                <span onClick = { () => this.setTimeScale( 999 ) }> Months </span>
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


export default History;
