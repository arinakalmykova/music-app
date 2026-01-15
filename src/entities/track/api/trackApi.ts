import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Track } from '@/entities';
import { LASTFM_API_KEY, LASTFM_API_URL, ITUNES_API_URL, ITUNES_RSS_URL } from '@/shared';

export const trackApi = createApi({
  reducerPath: 'trackApi',
  baseQuery: fetchBaseQuery({ baseUrl: LASTFM_API_URL }),
  endpoints: (builder) => ({
    getArtistTopTracks: builder.query<Track[], string>({
      query: (artistName) => ({
        url: '',
        params: {
          method: 'artist.gettoptracks',
          artist: artistName,
          api_key: LASTFM_API_KEY,
          format: 'json',
        },
      }),
      transformResponse: async (data: any, _meta, artistName) => {
        if (!data.toptracks?.track) return [];
        if (!artistName) return [];

        const tracks = await Promise.all(
          data.toptracks.track.map(async (t: any) => ({
            id: t.mbid || `${t.name}-${artistName}`,
            title: t.name,
            artist: { name: artistName },
            previewUrl: await getTrackPreview(artistName, t.name),
          }))
        );

        return tracks;
      },
    }),

    getTrackInfo: builder.query<Track | null, { artist: string; track: string }>({
      query: ({ artist, track }) => ({
        url: '',
        params: {
          method: 'track.getInfo',
          artist,
          track,
          api_key: LASTFM_API_KEY,
          format: 'json',
        },
      }),
      transformResponse: async (data: any, _meta, { artist, track }) => {
        if (!data?.track) return null;

        return {
          id: data.track.mbid || `${track}-${artist}`,
          title: data.track.name,
          artist: { id: artist, name: artist },
          previewUrl: (await getTrackPreview(artist, track)) ?? '',
          duration: data.track.duration,
          coverImage:
            data.track.image?.slice().reverse().find((img: any) => img['#text'])?.['#text'] || '',
        };

      },
    }),
  }),
});

// Генерация хуков RTK Query
export const { useGetArtistTopTracksQuery, useGetTrackInfoQuery } = trackApi;

// ----- Helper Functions -----
export async function getTrackPreview(artist: string, track: string): Promise<string | null> {
  try {
    const params = new URLSearchParams({
      term: `${artist} ${track}`,
      entity: 'song',
      limit: '1',
    });
    const res = await fetch(`${ITUNES_API_URL}/search?${params.toString()}`);
    const data = await res.json();
    return data.results?.[0]?.previewUrl ?? null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getGlobalTopTracks(): Promise<Track[]> {
  try {
    const res = await fetch(`${ITUNES_RSS_URL}/topsongs/limit=10/json`);
    const data = await res.json();
    return data.feed.entry.map((entry: any) => ({
      id: entry.id.attributes['im:id'],
      title: entry['im:name'].label,
      artist: {
        id: entry['im:artist'].label,
        name: entry['im:artist'].label,
        image: entry['im:image']?.[2]?.label || '',
        listeners: '0',
      },
      previewUrl: entry.link?.[1]?.attributes?.href || '',
    }));
  } catch (e) {
    console.error(e);
    return [];
  }
}
