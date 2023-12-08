import React from "react";
import { useParams } from "react-router-dom";
import { useGetCountryByNameQuery } from "./apiSlice";

export default function Details() {
  const { nameParameter } = useParams();
  const { data: countryData } = useGetCountryByNameQuery(nameParameter);

  console.log("nameParameter", nameParameter);
  console.log("countryData", countryData);
  return (
    countryData && (
      <div>
        <h1>{countryData[0].name.common}</h1>
        <img
          style={{ width: "100px" }}
          src={countryData[0].flags.png}
          alt={countryData[0].flags.alt}
        />
      </div>
    )
  );
}
