import type {Track} from '@/entities/track/model/types.ts';
import {toggleLike} from '@/app/store/slices/favoritesSlice';
import  { useSelector} from 'react-redux';
import { useAppDispatch } from '@/app/store/store';
import type { RootState} from '@/app/store/store';

export function useFavorities() {
  const dispatch = useAppDispatch();
  const tracks = useSelector<RootState,Track[]>(state => state.favorites.likedMusic);

  const onToggleLike = (track: Track) => {
    dispatch(toggleLike(track));
  };

  const isLiked = (track: Track) => tracks.some(t => t.id === track.id);

  return { tracks, onToggleLike, isLiked };
}
