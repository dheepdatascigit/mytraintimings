import axios from 'axios'
import React, { Component } from 'react'

export class TrainTime extends Component {

    state = {
        mytraintime: false
    }
    datatimestyle =  {
        dateStyle: 'full',
        timeStyle: 'short'
    }

    componentDidMount() {
        axios.get('http://timetableapi.ptv.vic.gov.au/v3/departures/route_type/0/stop/1044/route/3?direction_id=1&max_results=3&include_cancelled=false&include_geopath=true&devid=3001072&signature=93B8F7C2E31FA31D856517DCF776A1F49B8038F3')
            .then(res => {
                const timetablelist = res.data;
                console.log("timetablelist: ", timetablelist);
                this.setState({
                    mytraintime: timetablelist
                });
            })
    }

    getVal() {
        if (this.state.mytraintime) {
            return this.state.mytraintime.departures;
        }
        else {
            return ["it is false"];
        }

    }

    render() {
        return (
            <div>
                <p> Time Table</p>
                <ul className='trainlist'>
                    {'Next Three trains from Craigieburn to City: '}
                    { this.getVal().map(item => 
                        <li>
                            {new Date(item.scheduled_departure_utc).toLocaleString('en-AU', this.datatimestyle)}
                        </li>
                        )
                    }
                </ul>
            </div>
        )
    }
}

export default TrainTime
