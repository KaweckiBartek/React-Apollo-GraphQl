import React, { useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { GET_WEATHER_QUERY } from '../graphql/Queries'

const Home = () => {
  const [ citySearched, setCitySearched ] = useState('')
  const [ getWeather, { loading, data, error } ] = useLazyQuery(GET_WEATHER_QUERY, {
    variables: { name: citySearched }
  })

  if (error) return <h1>Error found</h1>
  if (data) {
    console.log(data);
  }
  
  return (
    <div className="home">
      <h1>Search for Weather</h1>
      <input onChange={ (e) => setCitySearched(e.target.value) } type="text" placeholder="City name..." />
      <button onClick={ () => getWeather() }>Search</button>

      <div className="weatcher">
        { loading
          ? <h1>Data Loading...</h1>
          :
          data && data.getCityByName && 
          <>
            <h1>City Name: { data.getCityByName.name }</h1>
            <h1>Temperature: {Math.round(data.getCityByName.weather.temperature.actual - 273.15) }°C</h1>
            <h1>Description: { data.getCityByName.weather.summary.description }</h1>
            <h1>Wind Speed: { data.getCityByName.weather.wind.speed }</h1>
          </>
        }
      </div>
    </div>
  )
}

export default Home
