import React from 'react';

import cloudy from '../images/cloudy.png'
import snow from '../images/snow.png'
import rain from '../images/rain.png'
import mist from '../images/mist.png'
import thunder from '../images/thunder.png'
import sunny from '../images/sunny.png'
import partlycloudy from '../images/partlycloudy.png'
import haze from '../images/haze.png'

const Box = (props)=>{
    const pics = [partlycloudy, snow, rain, mist ,thunder, sunny, cloudy, haze, snow, cloudy, snow, sunny]
    const sources = ['partly cloudy', 'snow', 'rain', 'mist' ,'thunder', 'sunny', 'cloudy', 'haze', 'sleet', 'overcast', 'blizzard', 'clear']
    const value = props.data_value[0].toLowerCase();
    const result = ()=>{
        for(let i =0; i<=pics.length-1; i++){
            if(value.toLowerCase().includes(sources[i])){
                return <img src={pics[i]} />
            }
        }
    }
    return(
        <div>
            <div>{result()}</div>
            <p><span className='results'>Temperature:  </span>{props.temperature}°C</p>
            <p><span className='results'>{props.data}:  </span>{props.data_value}</p>
        </div>
    )
}

export default Box