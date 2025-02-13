import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchInput  from './components/SearchInput';
import CountryList from './components/CountryList';
import CountryDetails from './components/CountryDetails'

const apiKey = import.meta.env.VITE_SOME_KEY;  // Acceso a la clave API

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null);  // Nuevo estado para el clima

  useEffect(() => {
    // Traemos la lista completa de países
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data);
        setFilteredCountries(response.data);
      })
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  useEffect(() => {
    if (search === '') {
      setFilteredCountries(countries);
    } else {
      const filtered = countries.filter(country =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCountries(filtered);
    }
  }, [search, countries]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(event.target.value.toLowerCase())
  )

    setFilteredCountries(filtered)

  };

  const handleShowDetails = (country) => {
    setSelectedCountry(country);

    // Obtener los datos meteorológicos para la capital del país seleccionado
    const capital = country.capital[0]

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)
      .then(response =>{
         setWeather(response.data)
      })
      .catch(error => console.error('Error fetching weather data:', error))

  };

  return (
    <div>
      <SearchInput search={search} onSearchChange ={handleSearchChange}/>
      <CountryList  
      filteredCountries={filteredCountries} 
      onShowDetails={handleShowDetails} />
       {/* Mostrar detalles del país seleccionado */}
       {selectedCountry && <CountryDetails country={selectedCountry} />}
         {/* Mostrar información meteorológica */}
         {
          weather && (
            <div>
              <h3>Weather in {selectedCountry.capital[0]}</h3>
              <p>Temperature: {weather.main.temp} °C</p>
              <p>Weather: {weather.weather[0].description}</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt={weather.weather[0].description}
              />
            </div>
            )
         }
      
    </div>
  );
}

export default App;
