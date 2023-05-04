//code to fetch from shazam core api
//need to create an api
import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/query/react";

export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://deezerdevs-deezer.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', 'c67a66c9c4msh85cdf88514dfd5fp15291ejsn9bd7571e97e6');
            headers.set('X-RapidAPI-Host', 'deezerdevs-deezer.p.rapidapi.com');

            return headers;
        },

    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({
            query: () => `/search?q=Dua%20Lipa`
        }),
        getSongDetails: builder.query({
            query: ({
                songid
            }) => `v1/tracks/details?track_id=${songid}`,
        }),
        getSongRelated: builder.query({
            query: ({
                songid
            }) => `v1/tracks/related?track_id=${songid}`
        }),
        // getArtistDetails: builder.query({
        //     query: (
        //         artistid
        //     ) => `v2/artists/details?artist_id=${artistid}`
        // }),
        getSongsBySearch: builder.query({
            query: (
                searchTerm
            ) => `/search?q=${searchTerm}`
        }),

    })
});

export const {
    useGetTopChartsQuery,
    useGetSongDetailsQuery,
    useGetSongRelatedQuery,
    useGetArtistDetailsQuery,
    useGetSongsBySearchQuery,

} = shazamCoreApi;







//we are creating an api call function out of the rapdi api toolkit





// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': 'c67a66c9c4msh85cdf88514dfd5fp15291ejsn9bd7571e97e6',
//         'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
//     }
// };

// fetch("https://shazam-core.p.rapidapi.com/v1/charts/world", options)
//     .then((res) => res.json())
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err));