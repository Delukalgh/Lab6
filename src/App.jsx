import React, { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./Countries";
import "./App.css"

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [continent, setContinent] = useState("");
  const [subregion, setSubregion] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");
  const [top10Criteria, setTop10Criteria] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const processedData = response.data.map(country => ({
          flag: country.flags.svg,
          name: country.name.common,
          capital: country.capital ? country.capital[0] : "N/A",
          population: country.population,
          area: country.area,
          continents: country.continents[0],
          subregion: country.subregion || "N/A",
        }));
        setCountries(processedData);
        setFilteredCountries(processedData);
      })
      .catch(error => console.error("Error loading countries:", error));
  }, []);

  const filterByContinent = (continentName) => {
    setContinent(continentName);
    setSubregion(""); // Clear subregion filter
    setFilteredCountries(
      countries.filter(country => country.continents === continentName)
    );
  };

  const filterBySubregion = (subregionName) => {
    setSubregion(subregionName);
    setContinent(""); // Clear continent filter
    setFilteredCountries(
      countries.filter(country => country.subregion === subregionName)
    );
  };

  const sortCountries = (criteria) => {
    setSortCriteria(criteria);
    const sorted = [...filteredCountries].sort((a, b) => {
      if (criteria === "alphabetically") return a.name.localeCompare(b.name);
      return 0;
    });
    setFilteredCountries(sorted);
  };

  const filterTop10 = (criteria) => {
    setTop10Criteria(criteria);
    const sorted = [...filteredCountries].sort((a, b) => b[criteria] - a[criteria]);
    setFilteredCountries(sorted.slice(0, 10));
  };

  return (
    <div>
      <h1 style={{ color: "#000"}}>Many Countires</h1>
      <div className="btn_container">
        <button className="btn" onClick={() => filterByContinent("Asia")}>Asia</button>
        <button className="btn" onClick={() => filterBySubregion("Southern Europe")}>
          Southern Europe
        </button>
        <button className="btn" onClick={() => filterTop10("population")}>Top 10 by Population</button>
        <button className="btn" onClick={() => filterTop10("area")}>Top 10 by Area</button>
        <button className="btn" onClick={() => sortCountries("alphabetically")}>Alphabetically</button>
        <button className="btn" onClick={() => setFilteredCountries(countries)}>Reset</button>
      </div>
      <Countries countries={filteredCountries} />
    </div>
  );
};

export default App;
