import type { ArtistInfo,Track,Album } from '@/entities';
import { getTrackPreview} from '@/entities';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { LASTFM_API_URL, LASTFM_API_KEY } from '@/shared';

export const albumApi = createApi({
  reducerPath: 'albumApi',
  baseQuery: fetchBaseQuery({ baseUrl:  LASTFM_API_URL }),
  endpoints: (builder) => ({
    getArtistTopAlbums: builder.query<ArtistInfo['topAlbums'], string>({
      query: (artistName) => ({
        url: '',
        params: {
          method: 'artist.gettopalbums',
          artist: artistName,
          api_key: LASTFM_API_KEY,
          format: 'json',
        },
      }),
    transformResponse: (response: any,_meta, arg) => {
        if (!response?.topalbums?.album) return [];
        return response.topalbums.album.map((a: any) => ({
          id: a.mbid || `${a.name}-${arg}`,
          title: a.name,
          artist: { name: arg },
          coverImage:
            a.image?.slice().reverse().find((img: any) => img['#text'])?.['#text'] || '',
          releaseDate: a.wiki?.published || '',
          tracks: [],
        }));
      }
    }),
    getAlbumInfo:builder.query<Album | null, { artistName: string; albumName: string }>({
      query: ({ artistName, albumName }) => ({
        url: '',
        params: {
          method: 'album.getinfo',
          artist: artistName,
          album: albumName,
          api_key: LASTFM_API_KEY,
          format: 'json',
        },
      }),
      transformResponse: async (response: any, _meta, arg) => {
        if (!arg) return null;
        if (!response?.album) return null;

        const tracks: Track[] = await Promise.all(
          (response.album.tracks?.track || []).map(async (t: any) => ({
            id: `${t.name}-${arg.artistName}`,
            title: t.name,
            artist: {
              id: arg.artistName,
              name: arg.artistName,
              image: '',
              listeners: '0',
            },
            previewUrl: await getTrackPreview(arg.artistName, t.name),
            coverImage:
              response.album.image?.slice().reverse().find((i: any) => i['#text'])
                ?.['#text'] || '',
          }))
        );

        return {
          id: response.album.mbid || arg.albumName,
          title: response.album.name,
          artist: {
            id: arg.artistName,
            name: arg.artistName,
            image: '',
            listeners: 0,
          },
          coverImage:
            response.album.image?.slice().reverse().find((i: any) => i['#text'])
              ?.['#text'] || '',
          tracks,
          releaseDate: response.album.wiki?.published || '',
        };
      },
    }),
  }),
});


export const { useGetArtistTopAlbumsQuery, useGetAlbumInfoQuery } = albumApi;





