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
  }),
});

export const {
  useGetAllCountriesQuery,
  useLazyGetCountriesByRegionQuery,
  useLazyGetCountriesBySubRegionQuery,
  useGetCountryByNameQuery,
} = countriesApi;
