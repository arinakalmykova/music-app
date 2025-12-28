import { LASTFM_API_KEY, LASTFM_API_URL } from '../../../shared/config/env';
import type { Artist } from '../model/types';

export async function searchArtists(query: string): Promise<Artist[]> {
  try {
    const response = await fetch(
      `${LASTFM_API_URL}?method=artist.search&artist=${query}&api_key=${LASTFM_API_KEY}&format=json`
    );
    const data = await response.json();

    if (!data.results || !data.results.artistmatches) return [];

    const artistsRaw = data.results.artistmatches.artist;

    return artistsRaw.map((a: any) => ({
      id: a.mbid || a.name,
      name: a.name,
      listeners: a.listeners,
      image: a.image?.[2]['#text'] || '',
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
}
