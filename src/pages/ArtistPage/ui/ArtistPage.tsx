import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useArtistInfo from '../../../features/useArtistInfo/model/useArtistInfo';
import { ArtistCard } from '../../../entities/artist/ui/ArtistCard';
import { TrackCard } from '../../../entities/track/ui/TrackCard';
import { AlbumCard } from '../../../entities/album/ui/AlbumCard';
import '../../../app/styles/ArtistPage.css';

export function ArtistPage() {
  const { name } = useParams();
  const { artistInfo, isLoading, error, loadArtistInfo } = useArtistInfo(name || '');

  useEffect(() => {
    if (name) loadArtistInfo();
  }, [name]);

  if (isLoading) return <p>Загрузка информации об артисте...</p>;
  if (error) return <p>{error}</p>;
  if (!artistInfo) return <p>Артист не найден</p>;

  return (
    <div className="artist-page">
      <div className="artist-header">
        <img src={artistInfo.image || '/placeholder.png'} alt={artistInfo.name} />
        <div className="artist-info">
          <h1>{artistInfo.name}</h1>
          <p>Слушателей: {artistInfo.listeners}</p>
          <p>Плейкаунт: {artistInfo.playcount}</p>
          <p>Биография: {artistInfo.bio}</p>
          <div className="artist-tags">
            {artistInfo.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <section className="artist-section">
        <h2>Топ-треки</h2>
        <div className="tracks-list">
          {artistInfo.topTracks.map(track => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </section>

      <section className="artist-section">
        <h2>Топ-альбомы</h2>
        <div className="albums-list">
          {artistInfo.topAlbums.map(album => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </section>

      <section className="artist-section">
        <h2>Похожие артисты</h2>
        <div className="similar-artists-list">
          {artistInfo.similarArtists.map(artist => (
            <Link key={artist.id} to={`/artist/${artist.name}`}>
              <ArtistCard artist={artist} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
