import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app';
import { fetchGlobalCharts } from '@/app';

export function useCharts() {
  const dispatch = useAppDispatch();
  const { topTracks, topArtists, isLoading, error } = useAppSelector(state => state.charts);

  useEffect(() => {
      dispatch(fetchGlobalCharts());
  }, [dispatch]);

  return { topTracks, topArtists, isLoading, error };
}
