import type { Artist } from '@/entities';

export interface Track {
  id: number;
  title: string;
  artistName: string;
  previewUrl: string;
  cover: string;
  artist: Artist
}
