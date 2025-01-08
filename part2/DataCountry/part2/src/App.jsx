import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

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
    setSearch(event.target.value);
  };

  return (
    <div>
      <h1>Country Finder</h1>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search for a country"
      />

      <div>
        {filteredCountries.length > 10 ? (
          <p>Too many matches, please be more specific</p>
        ) : filteredCountries.length > 1 ? (
          <ul>
            {filteredCountries.map((country, index) => (
              <li key={index}>{country.name.common}</li>
            ))}
          </ul>
        ) : filteredCountries.length === 1 ? (
          <div>
            <h2>{filteredCountries[0].name.common}</h2>
            <p>Capital: {filteredCountries[0].capital}</p>
            <p>Area: {filteredCountries[0].area}</p>
            <p>Languages: {Object.values(filteredCountries[0].languages).join(', ')}</p>
            <img
              src={filteredCountries[0].flags.png}
              alt={`Flag of ${filteredCountries[0].name.common}`}
              width="100"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
