import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetCountryByNameQuery,
  useLazyGetCountriesByCodesQuery,
} from "./apiSlice";

export default function Details() {
  const { nameParameter } = useParams();
  const {
    data: countryDetails,
    isLoading: countryDetailsLoading,
    error: countryDetailsError,
  } = useGetCountryByNameQuery(nameParameter);
  const [
    triggerCodesCountries,
    {
      data: countryCodes,
      isLoading: countryCodesLoading,
      error: countryCodesError,
    },
  ] = useLazyGetCountriesByCodesQuery();

  const borderString = countryDetails && countryDetails[0]?.borders?.join(",");

  useEffect(() => {
    borderString && triggerCodesCountries(borderString);
    console.log("codes effect ran");
  }, [borderString]);

  return (
    (countryDetailsLoading && <div>loading details</div>) ||
    (countryDetailsError && <div>error details</div>) ||
    (countryDetails && (
      <div>
        <h1>{countryDetails[0].name.common}</h1>
        <img
          style={{ width: "100px" }}
          src={countryDetails[0].flags.png}
          alt={countryDetails[0].flags.alt}
        />
        <div>
          <h3>Borders:</h3>
          <>
            {(countryCodesLoading && <div>loading borders</div>) ||
              (countryCodesError && <div>error borders</div>) ||
              countryCodes?.map((element, index) => (
                <Link key={index} to={`../details/${element.name?.common}`}>
                  {element.name?.common}
                </Link>
              ))}
            {!borderString && <div>no borders</div>}
          </>
        </div>
      </div>
    ))
  );
}
