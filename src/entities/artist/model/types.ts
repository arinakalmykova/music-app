export interface Artist {
  id: string;
  name: string;
  image: string;
  listeners: number;
}

export interface Track {
    id: string;
    title: string;
    duration: number;
    artistId: string;
}
