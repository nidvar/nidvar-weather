import React from 'react';
import axios from 'axios';
import Box from './Box';

class Weather extends React.Component{
    state={
        data:[],
        target:'',
        timer:null,
        token:`..`,
        key: '',
        show_results:false,
        selected_city:'',
        home:true
    }
    componentDidMount(){
        this.setState({timer:null})
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        this.fetch_geocodes()
        this.setState({
            target:'',
            show_results:false,
            home:false
        })
    }
    handleChange=(e)=>{
        this.setState({
            target: e.target.value,
        })
    }
    handleClick=(long, lat)=>{
        const fetching = async ()=>{
            const response = await axios.get(`http://api.weatherstack.com/current`,{
                params: {
                    query:`${lat},${long}`,
                    access_key: `${this.state.key}`,
                    units: 'm'
                }
            })
            console.log(response.data.current.weather_descriptions)
            this.setState({
                show_results:true,
                selected_city: response.data
            })
        }
        fetching();
    }
    fetch_geocodes = ()=>{
        if(this.state.target==''){
            return
        }else{
            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.state.target}.json?access_token=${this.state.token}`).then(a=>{
                return a.json()
            }).then(a=>{
                this.setState({
                    data: a.features
                })
            }).catch(e=>{console.log(e)})
        }
    }
    home=()=>{
        this.setState({
            home:true
        })
    }
    display_location=()=>{
        if(this.state.home == true){
            return (
                <div className='hometext'>
                    <h2>About this app</h2>
                    <p>Uses 3rd Party API's to generate weather forcasts of a desired location.</p>
                    <p>When the search button is clicked, the Mapbox API will generate longitude and latitude of the top 5 locations matching the search term.</p>
                    <p>After selecting a location, the Weatherstack API will return the appropriate forcast.</p>
                </div>
            )
        }else{
            if(this.state.show_results == false){
                return this.state.data.map(a=>{
                    return (
                        <p className='locationname'key={a.id} onClick={()=>{this.handleClick(a.center[0], a.center[1])}}>
                            {a.place_name}
                        </p>
                    )
                })
            }
            if(this.state.show_results==true){
                const x = this.state.selected_city.current
                return (
                    <div>
                        <Box data={'Description'} data_value={x.weather_descriptions} temperature = {x.temperature} />
                        <div className='stats'>
                            <div className='statsbox'>
                                <p><span className='results'>Humidity: </span>{x.humidity}%</p>
                                <p><span className='results'>Precipitation: </span>{x.precip}%</p>
                            </div>
                            <div className='statsbox'>
                                <p><span className='results'>Wind speed: </span>{x.wind_speed}km/h</p>
                                <p><span className='results'>Observation Time: </span>{x.observation_time}</p>
                            </div>
                        </div>
                        <br />
                        <br />
                        <button className="btn btn-primary homebutton" type="button" onClick={this.home}>HOME</button>
                    </div>
                )
            }
        }

    }
    render(){
        return(
            <div>
                <div className='myform'>
                    <form onSubmit={this.handleSubmit}>
                    <div className="input-group mb-3">
                        <input type="text" onChange={this.handleChange} value={this.state.target} className="form-control" placeholder="Enter Location" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button" onClick={this.handleSubmit}>SEARCH</button>
                        </div>
                    </div>
                    </form>
                </div>
                <div className='results_box'>
                    {this.display_location()}
                </div>
            </div>
        )
    }
}

export default Weather