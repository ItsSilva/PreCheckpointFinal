import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rickMortyFetch = createApi({
    reducerPath: 'rickMortyFetch',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/character'}),
    endpoints: (builder) => ({
        getCharacters: builder.query({
            query: (limit) => `?limit=${limit}`,
        })
    })
})

export const { useGetCharactersQuery } = rickMortyFetch;