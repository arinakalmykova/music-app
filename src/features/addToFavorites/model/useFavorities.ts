import type {Track} from '@/entities';
import {toggleLike} from '@/app';
import  { useSelector} from 'react-redux';
import { useAppDispatch } from '@/app';
import type { RootState} from '@/app';

export function useFavorities() {
  const dispatch = useAppDispatch();
  const tracks = useSelector<RootState,Track[]>(state => state.favorites.likedMusic);

  const onToggleLike = (track: Track) => {
    dispatch(toggleLike(track));
  };

  const isLiked = (track: Track) => tracks.some(t => t.id === track.id);

  return { tracks, onToggleLike, isLiked };
}
