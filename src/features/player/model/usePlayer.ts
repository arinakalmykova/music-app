import { useAppDispatch, useAppSelector } from '@/app';
import {playTrack, pause,togglePlay } from '@/app';
import type {Track} from '@/entities';

export function usePlayer() {
    const dispatch = useAppDispatch();
    const { currentTrack, isPlaying } = useAppSelector(state => state.player);

  const play = (track: Track) => {
    dispatch(playTrack(track));
  };

  const toggle = () => {
    dispatch(togglePlay());
  };

  const stop = () => {
    dispatch(pause());
  };

  return { currentTrack, isPlaying, play, toggle, stop };
}

