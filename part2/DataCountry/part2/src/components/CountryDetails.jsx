// CountryDetails.jsx
import React from 'react';

function CountryDetails({ country }) {

  if (!country) {
    return <p>No country data available</p>;
  }

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <img 
        src={country.flags.svg} 
        alt={`Flag of ${country.name.common}`} 
        style={{ width: '150px' }} 
      />
    </div>
  );
}

export default CountryDetails;

