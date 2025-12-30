export interface Artist {
  id: string;
  name: string;
  image: string;
  listeners: number;
}

export interface ArtistInfo {
  id: string;
  name: string;
  image: string;
  listeners: number;
  playcount: number;
  bio: string;
  tags: string[];
  similarArtists: Artist[];
  topTracks: Track[];
  topAlbums: Album[];
}

export interface Track {
    id: string;
    title: string;
    duration: number;
    artistId: string;
}

export interface Album {
    id: string;
    title: string;
    artistId: string;
    coverImage: string;
    releaseDate: string;
    tracks: Track[];
}
