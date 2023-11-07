import React, { useState } from "react";
import { useGetAllCountriesQuery } from "./apiSlice";

function App() {
  const { data: countries, error } = useGetAllCountriesQuery();
  const [sortBy, setSortBy] = useState(""); // Default sort by name
  const [filterByRegion, setFilterByRegion] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!countries) {
    return <div>Loading...</div>;
  }

  // Create a copy of the countries array to keep the original order when filtering
  let filteredCountries = [...countries];

  // Apply the region filter
  if (filterByRegion) {
    filteredCountries = filteredCountries.filter(
      (country) => country.region === filterByRegion
    );
  }

  if (nameFilter) {
    filteredCountries = filteredCountries.filter((country) =>
      country.name.common.toLowerCase().includes(nameFilter.toLowerCase())
    );
  }

  // Sort countries based on the selected sort option and order
  filteredCountries.sort((a, b) => {
    switch (sortBy) {
      case "pop+":
        return a.population - b.population;
      case "pop-":
        return b.population - a.population;
      case "name+":
        return a.name.common.localeCompare(b.name.common);
      case "name-":
        return b.name.common.localeCompare(a.name.common);
      default:
        return null;
    }
  });
  console.log(countries);
  console.log(filteredCountries);
  return (
    <div>
      <div>{filteredCountries.length}</div>
      <label>
        Filter by Region:
        <select
          onChange={(e) => setFilterByRegion(e.target.value)}
          value={filterByRegion}
        >
          <option value="">All</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
          {/* Add other region options if needed */}
        </select>
      </label>

      <label>
        Sort by:
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option defaultValue="none">None</option>
          <option value="name+">Name +</option>
          <option value="name-">Name -</option>
          <option value="pop+">Population +</option>
          <option value="pop-">Population -</option>
          {/* Add other sorting options if needed */}
        </select>
      </label>

      <label>
        Search by Name:
        <input
          type="text"
          placeholder="Search by name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
      </label>

      <ul>
        {filteredCountries.map((country) => (
          <li key={country.cca2}>{country.name.common}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
