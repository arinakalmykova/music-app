import type { Artist, ArtistInfo} from '@/entities';
import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { LASTFM_API_KEY,LASTFM_API_URL } from '@/shared';

export const artistApi = createApi({
  reducerPath: 'artistApi',
  baseQuery: fetchBaseQuery({ baseUrl: LASTFM_API_URL }),
  endpoints: (builder) => ({
    getArtistBaseInfo: builder.query<ArtistInfo | null, string>({
      query: (artistName) => ({
        url:'',
        params: {
          method: 'artist.getinfo',
          artist: artistName,
          api_key: LASTFM_API_KEY,
          format: 'json',
        }
      }),
    transformResponse: (response: any,_meta) => {
      if (!response.artist) return null;

      const artist = response.artist;
      const image = artist.image?.slice().reverse().find((img: any) => img['#text'])?.['#text'] || '';

      return {
        id: artist.mbid || artist.name,
        name: artist.name,
        listeners: artist.stats.listeners,
        image,
        tags: artist.tags.tag.map((t: any) => t.name),
        similarArtists: artist.similar.artist.map((a: any) => ({
          id: a.mbid || a.name,
          name: a.name,
          listeners: a.listeners || '0',
          image: a.image?.slice().reverse().find((img: any) => img['#text'])?.['#text'] || '',
        })),
        playcount: artist.stats.playcount,
        bio: artist.bio?.summary || '',
        topTracks: [],
        topAlbums: [],
      };
    }
    }),
    searchArtist: builder.query<Artist[], string>({
      query: (query) => ({
        url: '',
        params: {
          method: 'artist.search',
          artist: query,
          api_key: LASTFM_API_KEY,
          format: 'json',
        },
      }),

      transformResponse: (response: any) => {
        if (!response.results || !response.results.artistmatches) return [];
        const artistsRaw = response.results.artistmatches.artist;
        return artistsRaw.map((a: any) => {
        const image = a.image?.slice().reverse().find((img: any) => img['#text'])?.['#text'] || '';
        return {
          id: a.mbid || a.name,
          name: a.name,
          listeners: a.listeners,
          image,
        };
      });
      }
    })
  }),
})


export const { useGetArtistBaseInfoQuery, useSearchArtistQuery } = artistApi;




