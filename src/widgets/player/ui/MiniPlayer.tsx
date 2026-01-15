import { usePlayerContext } from '@/features';
import '@/app/styles/MiniPlayer.css';
import { Play,Pause, SkipBack, SkipForward } from "phosphor-react";
import { LikeButton } from '@/shared';
import { useFavorities } from '@/features';

export function MiniPlayer() {
  const { currentTrack, isPlaying, togglePlay, progress, duration, playPrev, playNext } = usePlayerContext();
  const {isLiked, onToggleLike} = useFavorities();

  if (!currentTrack) return null;

  const percent = duration ? (progress / duration) * 100 : 0;

  return (
    <div className="mini-player">
      <img src={currentTrack.coverImage} alt={currentTrack.title} className="mini-player__cover" />
      <div className="mini-player__info">
        <strong>{currentTrack.title}</strong>
        <span>{currentTrack.artist.name}</span>
      </div>
      <div className="mini-player__controls">
        <button onClick={playPrev}><SkipBack size={24} /></button>
        <button onClick={togglePlay}>
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button onClick={playNext}><SkipForward size={24} /></button>
      </div>

      <button className='mini-player__like'>
        <LikeButton liked={isLiked(currentTrack)} onToggle={() => onToggleLike(currentTrack)} />
      </button>
     
      <div className="mini-player__progress">
        <div style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
