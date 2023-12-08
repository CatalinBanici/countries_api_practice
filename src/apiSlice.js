import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const countriesApi = createApi({
  reducerPath: "countriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://restcountries.com/v3.1" }),
  endpoints: (builder) => ({
    getAllCountries: builder.query({
      query: () => "all",
    }),
    getCountriesByRegion: builder.query({
      query: (regionParam) => `region/${regionParam}`,
    }),
    getCountriesBySubRegion: builder.query({
      query: (subRegionParams) => `subregion/${subRegionParams}`,
    }),
    getCountryByName: builder.query({
      query: (nameParams) => `name/${nameParams}?fullText=true`,
    }),
    getCountriesByCodes: builder.query({
      query: (codesParams) => `alpha?codes=${codesParams}`,
    }),
  }),
});

export const {
  useGetAllCountriesQuery,
  useLazyGetCountriesByRegionQuery,
  useLazyGetCountriesBySubRegionQuery,
  useGetCountryByNameQuery,
  useLazyGetCountriesByCodesQuery,
} = countriesApi;
