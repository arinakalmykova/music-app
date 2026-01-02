import { LASTFM_API_KEY, LASTFM_API_URL } from '../../../shared/config/env';
import type { Artist, ArtistInfo } from '../model/types';

export async function searchArtists(query: string): Promise<Artist[]> {
  try {
    const response = await fetch(
      `${LASTFM_API_URL}?method=artist.search&artist=${query}&api_key=${LASTFM_API_KEY}&format=json`
    );
    const data = await response.json();

    if (!data.results || !data.results.artistmatches) return [];

    const artistsRaw = data.results.artistmatches.artist;
 
    return artistsRaw.map((a: any) => {
    const image = a.image?.slice().reverse().find((img: any) => img['#text'])?.['#text'] || '';
    return {
      id: a.mbid || a.name,
      name: a.name,
      listeners: a.listeners,
      image,
    };
  });

  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getArtistBaseInfo(artistName: string): Promise<Pick<ArtistInfo, 'id' | 'name' | 'listeners' | 'image' | 'tags' | 'similarArtists' | 'playcount' | 'bio'> | null> {
  try {
    const response = await fetch(
      `${LASTFM_API_URL}?method=artist.getinfo&artist=${artistName}&api_key=${LASTFM_API_KEY}&format=json`
    );
    const data = await response.json(); 

    if (!data.artist) return null;

    const artist = data.artist;
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
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getArtistTopTracks(artistName: string): Promise<ArtistInfo['topTracks']> {
  try {
    const response = await fetch(
      `${LASTFM_API_URL}?method=artist.gettoptracks&artist=${artistName}&api_key=${LASTFM_API_KEY}&format=json`
    );
    const data = await response.json();
    if (!data.toptracks || !data.toptracks.track) return [];
    return data.toptracks.track.map((t: any) => ({
      id: t.mbid || `${t.name}-${artistName}`,
      title: t.name,
      artistId: artistName,
    }));
  } catch (err) {
    console.error(err);
    return [];
  }  
}

export async function getArtistTopAlbums(artistName: string): Promise<ArtistInfo['topAlbums']> { 
  try {
    const response = await fetch(
      `${LASTFM_API_URL}?method=artist.gettopalbums&artist=${artistName}&api_key=${LASTFM_API_KEY}&format=json`
    );
    const data = await response.json();
    if (!data.topalbums || !data.topalbums.album) return [];
    return data.topalbums.album.map((a: any) => ({
      id: a.mbid || `${a.name}-${artistName}`,
      title: a.name,
      artistId: artistName,
      coverImage: a.image?.slice().reverse().find((img: any) => img['#text'])?.['#text'] || '',
      releaseDate: a.wiki?.published || '',
      tracks: [],
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getFullArtistInfo(artistName: string): Promise<ArtistInfo | null> {
  try {
    const [baseInfo, topTracks, topAlbums] = await Promise.all([
      getArtistBaseInfo(artistName),
      getArtistTopTracks(artistName),
      getArtistTopAlbums(artistName)
    ]);

    if (!baseInfo) return null;

    return {
      ...baseInfo,
      topTracks,
      topAlbums
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}


