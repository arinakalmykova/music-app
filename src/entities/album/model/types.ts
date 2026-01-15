import type { Track } from '@/entities';
import type { Artist } from '@/entities';
export interface Album {
    id: string;
    title: string;
    artist: Artist;
    coverImage: string;
    releaseDate: string;
    tracks: Track[];
}
