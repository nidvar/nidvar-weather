import React from 'react';
import axios from 'axios';

class Weather extends React.Component{
    state={
        data:[],
        target:'',
        timer:null,
        token:``,
        key: '',
        show_results:false,
        selected_city:''
    }
    componentDidMount(){
        this.setState({timer:null})
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        this.fetch_geocodes()
        this.setState({
            target:'',
            show_results:false
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
                    units: 'f'
                }
            })
            console.log(response.data)
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
    display_location=()=>{
        if(this.state.show_results == false){
            if(this.state.data == undefined){
                return null
            }else{
                return this.state.data.map(a=>{
                    return (
                        <p className='locationname'key={a.id} onClick={()=>{this.handleClick(a.center[0], a.center[1])}}>
                            {a.place_name}
                        </p>
                    )
                })
            }
        }
        if(this.state.show_results==true){
            const x = this.state.selected_city.current
            console.log(x)
            return (
                <div>
                    <p><span class='results'>Humidity: </span>{x.humidity}</p>
                    <p><span class='results'>Temperature: </span>{x.temperature}</p>
                    <p><span class='results'>Precipitation: </span>{x.precip}</p>
                    <p><span class='results'>Description: </span>{x.weather_descriptions}</p>
                    <p><span class='results'>Wind speed: </span>{x.wind_speed}</p>
                    <p><span class='results'>Observation Time: </span>{x.observationTime}</p>
                </div>
            )
        }
    }
    render(){
        return(
            <div>
                <div className='myform'>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" onChange={this.handleChange} value={this.state.target} />
                        <button>SEARCH</button>
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