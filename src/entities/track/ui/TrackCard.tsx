import { LikeButton } from '@/shared/ui/LikeButton';
import { PlayButton } from '@/shared/ui/PlayButton';
import { useFavorities } from '@/features/addToFavorites/model/useFavorities';
import type { Track } from '@/entities/track/model/types.ts'
import '@/app/styles/TrackCard.css';

interface TrackCardProps {
  track: Track;
  index?: number; 
}

export function TrackCard({ track, index }: TrackCardProps) {
  const { onToggleLike, isLiked } = useFavorities();

  return (
    <div className="track-item">
      <div className="track-info">
        {index !== undefined && <span className="track-number">{index + 1}</span>}
        <h3>{track.title}</h3>
      </div>
      <div className="track-actions">
        <LikeButton liked={isLiked(track)} onToggle={() => onToggleLike(track)} />
        <PlayButton track = {track} />
      </div>
    </div>
  );
}
