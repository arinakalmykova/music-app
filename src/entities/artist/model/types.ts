import type { Track } from '@/entities/track/model/types';
import type { Album } from '@/entities/album/model/types';

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
