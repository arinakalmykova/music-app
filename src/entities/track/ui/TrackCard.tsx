import { LikeButton } from '@/shared';
import { PlayButton } from '@/shared';
import { useFavorities } from '@/features';
import type { Track } from '@/entities'
import '@/app/styles/TrackCard.css';

interface TrackCardProps {
  track: Track;
  index?: number; 
  tracks?: Track[]
}

export function TrackCard({ track, index,tracks }: TrackCardProps) {
  const { onToggleLike, isLiked } = useFavorities();

  return (
    <div className="track-item">
      <div className="track-info">
        {index !== undefined && <span className="track-number">{index + 1}</span>}
        <h3>{track.title}</h3>
        <span className="track-artist">
          {track.artist?.name ?? 'Unknown artist'}
        </span>
      </div>
      <div className="track-actions">
        <LikeButton liked={isLiked(track)}  onToggle={() => onToggleLike(track)} />
        <PlayButton track = {track} tracks={tracks}/>
      </div>
    </div>
  );
}
