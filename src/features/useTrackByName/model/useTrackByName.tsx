import { useGetTrackInfoQuery } from '@/entities';

export function useTrackByName({
  artistName,
  trackName,
}: {
  artistName: string;
  trackName: string;
}) {
  // RTK Query сам делает fetch и кеширует результат
  const { data: track, isLoading, error } = useGetTrackInfoQuery(
    { artist: artistName, track: trackName },
    { skip: !artistName || !trackName } // пропускаем запрос если нет данных
  );

  return { track, isLoading, error };
}
