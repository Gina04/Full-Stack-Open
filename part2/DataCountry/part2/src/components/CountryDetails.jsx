// CountryDetails.jsx
import React from 'react';

function CountryDetails({ country }) {
  if (!country) return null; // Evita errores si no hay país seleccionado
  return (
    <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <p>
          Languages: {Object.values(country.languages).join(", ")}
        </p>
        <img
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          width="100"
        />
      </div>
  );
}

export default CountryDetails;

