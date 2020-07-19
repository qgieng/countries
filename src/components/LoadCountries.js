import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


const LoadWeather = ({country})=>{
  const [weatherData, setWeather] = useState('');
  const weather_base_url = 'http://api.weatherstack.com/current'
  const api_key = process.env.REACT_APP_API_KEY;
  const full_api_link = `${weather_base_url}?access_key=${api_key}&query=${country.capital}`

  const hook = ()=>{
    axios.get(full_api_link)
    .then((request)=>{
      setWeather(request.data);
    }).catch(error=>{console.log(error)})
  }
  useEffect(hook,[]);
  if(weatherData !== '' && weatherData !== undefined && weatherData !== null)
    return(
      <div>
          <h1>Weather in {country.capital}</h1>
          <LoadWeatherData weatherData = {weatherData}/>
      </div>
    )
  else 
      return(<></>)
};

const LoadWeatherData= ({weatherData})=>{
    console.log('weatherData', weatherData)
    return(
      <div>
        <p><b>temperature {weatherData.current.temperature}</b></p>
        <img src={weatherData.current.weather_icons[0]} alt={weatherData.current.weather_descriptions}/> 
        <p><b>wind: {weatherData.current.wind_speed} mph direction {weatherData.current.wind_dir}</b></p>
      </div>
    )

}
const LoadCountryInfo= ({country})=>{
    

    return(
      <div>
        <li>
        <h1>{country.name}</h1>
        <br/>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h3>languages</h3>
        <ul>
          {country.languages.map((language)=>{
            return <LoadLang 
              key={language.iso639_1+language.name} 
              language={language}/>
          })}
        </ul>
  
        <img src={country.flag} alt={country.name} border='5px solid #555' height='500px' width='500px'/>
        <LoadWeather country={country}/>
        </li>
      </div>
    );
  }
  
  const LoadCountry= ({country})=>{
    const handleShowCountry = (event)=>{
      ReactDOM.render(<LoadCountryInfo country={country}/>, document.getElementById('country'));
    }
    const handleHideCountry = (event)=>{
      ReactDOM.render(<LoadCountry country={country}/>, document.getElementById('country'));
    }
  
    return(<li>
      <p>
      {country.name}
      <button onClick={handleShowCountry}>show</button>
      <button onClick={handleHideCountry}>hide</button></p>
      <div id='country'/>
    </li>);
  }
  
  const LoadLang = ({language})=>{
    return(<p>{language.name}</p>)
  }
  
  const LoadCountries=({countries})=>{
    
  
    if(countries.length > 10)
      return(
        <div><p>Too many matches, specify another filter</p></div>
      )
    else if(countries.length === 1){
      return(
        <div>
          <ul>
          {countries.map(country=>{
            return <LoadCountryInfo 
                    key = {country.name + country.alpha3Code} 
                    country = {country}/>
          })}
          </ul>
        </div>
      )
    }
    else
        return(
          <div>
            <ul>
            {countries.map(country=>{
              return(
                <LoadCountry 
                      key = {country.name+country.alpha3Code} 
                      country = {country}/>
            )})}
            </ul>
             
          </div>
        )
  }



export default LoadCountries