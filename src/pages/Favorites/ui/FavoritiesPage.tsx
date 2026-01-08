import { TrackCard } from '@/entities/track/ui/TrackCard';
import { useFavorities } from '@/features/addToFavorites/model/useFavorities';

export function FavoritiesPage() {
  const { tracks } = useFavorities();

  if (tracks.length === 0) return <p>Нет любимых треков</p>;

  return (
    <div className="favorites-page">
      <h1>Любимые треки</h1>
      <div className="tracks-list">
        {tracks.slice(0, 10).map((track, i) => (
          <TrackCard key={track.id} track={track} index={i} />
        ))}
      </div>
    </div>
  );
}
