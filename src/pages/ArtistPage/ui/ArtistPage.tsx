import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useArtistInfo } from '@/features';
import { ArtistCard } from '@/entities';
import { AlbumCard } from '@/entities';
import { TrackCard } from '@/entities';
import '@/app/styles/ArtistPage.css';
import { ArrowLeft } from 'phosphor-react';

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
      <div className="artist-section-header" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.34), rgba(0, 0, 0, 0.64)), url(${artistInfo.image || '/placeholder.png'})` }}>
        <Link to="/" className="back-button">
          <ArrowLeft className="arrow-icon" />
          <span>Назад</span>
        </Link>
          <div className="artist-content">
            <h1 className="artist-name">{artistInfo.name}</h1>
            <div className="monthly-listeners">{artistInfo.listeners} слушателей</div>
          </div>
      </div>

      <section className="artist-section-genre">
        <div className="artist-info">
          <div className="artist-tags"> 
            <p>Жанры: {artistInfo.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}</p>
          </div>
        </div>
      </section>

        <section className="artist-section-tracks">
      <h2>Топ-треки</h2>
      <div className="tracks-list">
        {artistInfo.topTracks.slice(0, 10).map((track, i) => (
          <TrackCard key={track.id} track={track} index={i} />
        ))}
      </div>
    </section>


      <section className="artist-section-albums">
        <h2>Топ-альбомы</h2>
        <div className="albums-list">
          {artistInfo.topAlbums.map(album => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </section>

      <section className="artist-section-similar-artists">
        <h2>Похожие артисты</h2>
        <div className="similar-artists-list">
          {artistInfo.similarArtists.map(artist => (
              <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>
    </div>
  );
}
