import React from "react";

const Country = ({ country }) => {
  return (
    <div style={{ border: "2px solid #000", margin: "100px", padding: "40px", alignItems: "center", borderRadius: 20, color: "#000" }}>
      <img src={country.flag} alt={`${country.name} flag`} style={{ width: "50em", borderRadius: 100 }} />
      <h2>{country.name}</h2>
      <p><strong>Capital:</strong> {country.capital}</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Area:</strong> {country.area.toLocaleString()} km²</p>
      <p><strong>Continent:</strong> {country.continents}</p>
      <p><strong>Subregion:</strong> {country.subregion}</p>
    </div>
  );
};

export default Country;
