import { LASTFM_API_KEY, LASTFM_API_URL } from '@/shared';
import type { Artist, ArtistInfo,Track } from '@/entities';

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

export async function getArtistTopTracks(
  artistName: string
): Promise<ArtistInfo['topTracks']> {
  const response = await fetch(
    `${LASTFM_API_URL}?method=artist.gettoptracks&artist=${artistName}&api_key=${LASTFM_API_KEY}&format=json`
  );
  const data = await response.json();

  if (!data.toptracks?.track) return [];

  const tracks = await Promise.all(
    data.toptracks.track.map(async (t: any) => ({
      id: t.mbid || `${t.name}-${artistName}`,
      title: t.name,
      artistId: artistName,
      previewUrl: await getTrackPreview(artistName, t.name),
    }))
  );

  return tracks;
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


export async function getTrackPreview(artist: string, track: string): Promise<string | null> {
  const response = await fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(
      artist + ' ' + track
    )}&entity=song&limit=1`
  );
  const data = await response.json();
  return data.results?.[0]?.previewUrl ?? null;
}


export async function getGlobalTopTracks(): Promise<Track[]> {
  const response = await fetch('https://itunes.apple.com/us/rss/topsongs/limit=10/json');
  const data = await response.json();

  return data.feed.entry.map((entry: any) => ({
    id: entry.id.attributes['im:id'],
    title: entry['im:name'].label,
    artist: entry['im:artist'].label,
    previewUrl: entry.link[1]?.attributes?.href || '',
    coverImage: entry['im:image'][2]?.label || '', 
  }));
}



