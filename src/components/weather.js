import React from 'react';

class Weather extends React.Component{
    state={
        data:[],
        target:'',
        timer:null
    }
    componentDidMount(){
        this.setState({timer:null})
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        console.log('test')
    }
    handleChange=(e)=>{
        this.setState({
            target: e.target.value
        })
        clearTimeout(this.state.timer);
        this.setState({timer:setTimeout(()=>{
            this.fetch_geocodes()
        },2000)})
    }
    fetch_geocodes = ()=>{
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.state.target}.json?access_token=`).then(a=>{
            return a.json()
        }).then(a=>{
            this.setState({
                data: a.features
            })
        }).catch(e=>{console.log(e)})
    }
    display_location=()=>{
        return this.state.data.map(a=>{
            return (<div key={a.id}><h2>{a.place_name}</h2></div>)
        })
    }
    render(){
        console.log(this.state)
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" onChange={this.handleChange}/>
                </form>
                <div className='my_dropdown'>
                    {this.display_location()}
                </div>
            </div>
        )
    }
}

export default Weather