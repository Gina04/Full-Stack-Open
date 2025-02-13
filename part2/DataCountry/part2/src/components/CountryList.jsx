import CountryDetails from "./CountryDetails";

const CountryList = ({ filteredCountries,onShowDetails }) => {
  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (filteredCountries.length > 1) {
    return (
      <ul>
        {filteredCountries.map((country, index) => (
          <li 
          key={index}>{country.name.common} 
          <button onClick={() => onShowDetails(country)}>Show</button></li>
        ))}

        
      </ul>


    );
  }

  if (filteredCountries.length === 1) {
    return <CountryDetails country={filteredCountries[0]} />;
  }

  return null; // Evita warnings si no hay países
};

export default CountryList;
