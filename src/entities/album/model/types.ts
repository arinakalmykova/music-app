import type { Track } from '@/entities/track/model/types';

export interface Album {
    id: string;
    title: string;
    artistId: string;
    coverImage: string;
    releaseDate: string;
    tracks: Track[];
}
