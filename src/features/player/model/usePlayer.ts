import { useAppDispatch, useAppSelector } from '@/app/store/store';
import {playTrack, pause,togglePlay } from '@/app/store/slices/playerSlice';
import type {Track} from '@/entities/track/model/types.ts';

export default function usePlayer() {
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

