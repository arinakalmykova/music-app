import type { Track } from '@/entities';

export interface Album {
    id: string;
    title: string;
    artistId: string;
    coverImage: string;
    releaseDate: string;
    tracks: Track[];
}
