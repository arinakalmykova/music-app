import {usePlayer} from "@/features";
import { Play,Pause } from "phosphor-react";
import type {Track} from '@/entities';

interface PlayButtonProps {
  track: Track;
}

export function PlayButton({track}: PlayButtonProps) {
  const { currentTrack, isPlaying, play, toggle } = usePlayer();
  const isCurrent = currentTrack?.id === track.id;

  const handleClick = () => {
    if (!isCurrent) play(track);
    else toggle();
  };

  return isCurrent && isPlaying ? (
    <Pause size={24} onClick={handleClick} />
  ) : (
    <Play size={24} onClick={handleClick} />
  );
}
