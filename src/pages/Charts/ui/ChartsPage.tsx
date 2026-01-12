import { TrackCard, ArtistCard } from '@/entities';
import { useCharts } from '@/features';
import '@/app/styles/ChartsPage.css';

export function ChartsPage() {
  const { topTracks, topArtists, isLoading, error } = useCharts();

  if (isLoading) return <p>Загрузка чартов...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="charts-page">
      <section className="charts-section tracks">
        <h2>Топ-треки</h2>
        <div className="tracks-list">
          {topTracks.slice(0, 10).map((track, i) => (
            <TrackCard key={track.id} track={track} index={i} />
          ))}
        </div>
      </section>

      <section className="charts-section artists">
        <h2>Топ-артисты</h2>
        <div className="artists-list">
          {topArtists.map(artist => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>
    </div>
  );
}
