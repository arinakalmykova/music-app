import type { Track } from '@/entities';
import type { Album } from '@/entities';

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
