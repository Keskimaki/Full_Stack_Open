import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Find = ( {value, handleChange} ) => <>find countries <input value={value} onChange={handleChange} /></>

const Button = ( {text, name, setSearch} ) => {
  const buttonClick = () => {
    setSearch(name)
  }
  return (
    <button onClick={buttonClick}>{text}</button>
  )
}

const CountryList = ( {value, countryData, setSearch} ) => {
  const filteredData = countryData.filter(data => data.name.toLowerCase().includes(value))
  if (filteredData.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (filteredData.length !== 1) {
    return (
      <div>
        {filteredData.map(data => <div key={data.name}>{data.name} <Button text="show" name={data.name} setSearch={setSearch} /></div>)}
      </div>
    )
  } else {
    return <CountryInfo country={filteredData[0]} />
  }
}

const CountryInfo = ( {country} ) => {

  /*const api_key = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState([])

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then(response => {
        setWeather(response.data)
      }, [])
  })*/

  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flags.svg} alt="Country flag" width="150" height="auto"/>
      {/*
      <h2>Weather in {country.capital}</h2>
      <div>temperature: {weather.current.temperature} celsius</div>
      <img src={weather.current.weather_icons[0]} />
      <div>wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</div>
      */}
    </div>
  )
}

const App = () => {

  const [ countryData, setCountryData ] = useState([])
  const [ searchCountry, setSearchCountry ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        setCountryData(response.data)
      })
  }, [])

  return (
    <div>
      <Find value={searchCountry} 
        handleChange={event => {
          setSearchCountry(event.target.value)
        }} />
      <CountryList value={searchCountry.toLowerCase()} 
        countryData={countryData} 
        setSearch={setSearchCountry} />
    </div>
  )
}

export default App
