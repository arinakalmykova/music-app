import { useParams } from 'react-router-dom';
import { useGetAlbumInfoQuery } from '@/entities';
import { AlbumCard } from '@/entities';
import '@/app/styles/AlbumPage.css';
import '@/app/styles/TrackCard.css';
import {TrackCard} from '@/entities';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'phosphor-react';
import type { Track } from '@/entities';

export function AlbumPage() {
  const { artistName, albumName } = useParams<{
    albumName?: string;
    artistName?: string;
  }>();

  if (!albumName || !artistName) {
    return <p>Неверный URL</p>;
  }

  const { data:albumInfo, isLoading, error } = useGetAlbumInfoQuery({artistName, albumName});

  if (!albumInfo && !isLoading) return <p>Альбом не найден</p>;

  return (
    <div>
      {isLoading && <p>Загрузка...</p>}

      {error && <p>{typeof error === 'string' ? error : JSON.stringify(error)}</p>}

      <Link to={`/artist/${artistName}`} className="album_back-button">
        <ArrowLeft className="arrow-icon" />
      </Link>

      {albumInfo && (
        <>
          <h2>Альбом</h2>
          <AlbumCard album={albumInfo} />

          <h3>Треки</h3>
          <div className="track-list">
            {albumInfo.tracks.map((track: Track, index: number) => (
              <TrackCard
                key={track.id}
                track={track}
                index={index}
                tracks={albumInfo.tracks}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
