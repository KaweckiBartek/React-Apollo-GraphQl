import React from 'react'
import { useLazyQuery } from '@apollo/client'
import { GET_WEATHER_QUERY } from '../graphql/Queries'

const Home = () => {
  const [ getWeather, { loading, data, error } ] = useLazyQuery(GET_WEATHER_QUERY, {
    variables: { name: 'Vancouver' }
  })

  if (error) return <h1>Error found</h1>
  if (data) {
    console.log(data);
  }
  return (
    <div className="home">
      <h1>Search for Weather</h1>
      <input type="text" placeholder="City name..." />
      <button onClick={ () => getWeather() }>Search</button>

    </div>
  )
}

export default Home
