import React, { useEffect, useState } from "react";
import {
  useGetAllCountriesQuery,
  useLazyGetCountriesByRegionQuery,
  useLazyGetCountriesBySubRegionQuery,
} from "./apiSlice";

function App() {
  const {
    data: allCountries,
    isLoading: allCountriesLoading,
    error: allCountriesError,
  } = useGetAllCountriesQuery();

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

  const [sortBy, setSortBy] = useState("");
  const [filterByRegion, setFilterByRegion] = useState("");
  const [filterBySubRegion, setFilterBySubregion] = useState("");
  const [filterSearchByName, setFilterSearchByName] = useState("");

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

  if (allCountriesLoading || regionCountriesLoading || subRegionLoading) {
    return <div>Loading...</div>;
  }

  if (allCountriesError || regionCountriesError || subRegionError) {
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

  if (filterSearchByName) {
    displayCountries = displayCountries.filter((country) =>
      country.name.common
        .toLowerCase()
        .includes(filterSearchByName.toLowerCase())
    );
  }

  const subRegions =
    (filterByRegion && regionCountries.map((e) => e.subregion)) ||
    allCountries.map((e) => e.subregion);
  const subRegionsArr = [...new Set(subRegions)];

  const regions = allCountries.map((e) => e.region);
  const regionsArr = [...new Set(regions)];

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

  console.log("displayCountries", displayCountries);

  return (
    <div>
      <div>{displayCountries.length}</div>
      <label>
        Filter by Region:
        <select
          onChange={(e) => {
            setFilterByRegion(e.target.value);
            setFilterSearchByName("");
            setFilterBySubregion("");
          }}
          value={filterByRegion}
        >
          <option value="">All</option>
          {regionsArr.map((e, i) => (
            <option key={i}>{e}</option>
          ))}
        </select>
      </label>

      <label>
        Filter by subregion
        <select
          onChange={(e) => {
            setFilterBySubregion(e.target.value);
            setFilterSearchByName("");
          }}
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
          <option defaultValue="">None</option>
          <option value="name+">Name +</option>
          <option value="name-">Name -</option>
          <option value="pop+">Population +</option>
          <option value="pop-">Population -</option>
        </select>
      </label>

      <label>
        Search by Name:
        <input
          type="search"
          placeholder="Search by name"
          value={filterSearchByName}
          onChange={(e) => setFilterSearchByName(e.target.value)}
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
