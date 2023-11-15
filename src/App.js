import React, { useEffect, useState } from "react";
import {
  useGetAllCountriesQuery,
  useLazyGetCountriesByRegionQuery,
  useLazyGetCountriesBySubRegionQuery,
} from "./apiSlice";

function App() {
  const [
    triggerRegionCountries,
    {
      data: regionCountries,
      isLoading: regionCountriesLoading,
      error: regionCountriesError,
    },
  ] = useLazyGetCountriesByRegionQuery();

  const [
    triggerSubRegionCountries,
    {
      data: subRegionCountries,
      isLoading: subRegionLoading,
      error: subRegionError,
    },
  ] = useLazyGetCountriesBySubRegionQuery();

  const {
    data: allCountries,
    isLoading: allCountriesLoading,
    error: allCountriesError,
  } = useGetAllCountriesQuery();

  const [sortBy, setSortBy] = useState(""); // Default sort by name
  const [filterByRegion, setFilterByRegion] = useState("");
  const [filterBySubRegion, setFilterBySubregion] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [subRegionNames, setSubRegionsName] = useState("");

  useEffect(() => {
    if (filterByRegion) {
      triggerRegionCountries(filterByRegion);
    }
    console.log("filterByRegion effect");
  }, [filterByRegion]);

  useEffect(() => {
    if (filterBySubRegion) {
      triggerSubRegionCountries(filterBySubRegion);
      console.log("filterBySubRegion effect");
    }
  }, [filterBySubRegion]);

  console.log("subRegionCountries", subRegionCountries);

  if (allCountriesLoading || regionCountriesLoading) {
    return <div>Loading...</div>;
  }

  if (allCountriesError || regionCountriesError) {
    return <div>ERROR</div>;
  }

  let displayCountries;

  if (allCountries && !filterByRegion) {
    displayCountries = [...allCountries];
  } else if (regionCountries && filterByRegion) {
    displayCountries = [...regionCountries];
  } else {
    return null;
  }

  if (subRegionCountries && filterBySubRegion) {
    displayCountries = [...subRegionCountries];
  }

  // console.log("regionCountries", regionCountries);
  // console.log("displayCountries", displayCountries);

  // const subRegions =
  //   (regionCountries && regionCountries.map((e) => e.subregion)) ||
  //   allCountries.map((e) => e.subregion);

  const subRegions =
    (filterByRegion && regionCountries.map((e) => e.subregion)) ||
    allCountries.map((e) => e.subregion);

  const subRegionsArr = [...new Set(subRegions)];

  console.log(subRegionsArr);

  displayCountries.sort((a, b) => {
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

  return (
    <div>
      <div>{displayCountries.length}</div>
      <label>
        Filter by Region:
        <select
          onChange={(e) => {
            setFilterByRegion(e.target.value);
            setFilterBySubregion("");
          }}
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
        Filter by subregion
        <select
          onChange={(e) => setFilterBySubregion(e.target.value)}
          value={filterBySubRegion}
        >
          <option value="">All</option>
          {subRegionsArr.map((e, i) => (
            <option key={i}>{e}</option>
          ))}
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
        {displayCountries.map((country) => (
          <li key={country.cca2}>{country.name.common}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
