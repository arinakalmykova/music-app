import { useState } from 'react';
import type {Track} from '@/entities/track/model/types.ts';

export function useFavorities() {
  const [likedTracks, setLikedTracks] = useState<Track[]>(() => {
    const stored = localStorage.getItem('likedTracks');
    return stored ? JSON.parse(stored) : [];
  });

  const toggleLike = (track: Track) => {
    setLikedTracks(prev => {
      const isLiked = prev.find(t => t.id === track.id);
      const updated = isLiked ? prev.filter(t => t.id !== track.id) : [...prev, track];
      localStorage.setItem('likedTracks', JSON.stringify(updated));
      return updated;
    });
  };

  const isLiked = (track: Track) => likedTracks.some(t => t.id === track.id);

  return { likedTracks, toggleLike, isLiked };
}
