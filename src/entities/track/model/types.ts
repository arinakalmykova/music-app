import type { Artist } from "@/entities";

export interface Track {
  id: number;
  title: string;
  artist: Artist;
  previewUrl: string;
  coverImage: string;
  duration: number;
}

