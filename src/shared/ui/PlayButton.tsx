import {usePlayerContext} from "@/features";
import { Play,Pause } from "phosphor-react";
import type {Track} from '@/entities';

interface PlayButtonProps {
  track: Track;
  tracks?: Track[]
}

export function PlayButton({track, tracks}: PlayButtonProps) {
  const { currentTrack, isPlaying, playTrack, togglePlay } = usePlayerContext();
  const isCurrent = currentTrack?.id === track.id;

  const handleClick = () => {
    if (!isCurrent) playTrack(track, tracks);
    else togglePlay();
  };

  return isCurrent && isPlaying ? (
    <Pause size={24} onClick={handleClick} />
  ) : (
    <Play size={24} onClick={handleClick} />
  );
}

