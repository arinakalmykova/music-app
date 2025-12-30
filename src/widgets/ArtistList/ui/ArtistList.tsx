import type {Artist} from '../../../entities/artist/model/types';
import {ArtistCard} from '../../../app/router/router';
import '../../../app/styles/ArtistList.css';

interface ArtistListProps {
    artists: Artist[]
    isLoading: boolean;
    error: string | null;
}

export function ArtistList({ artists, isLoading, error }: ArtistListProps) {
    if (isLoading) {
        return <p>Загрузка...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (artists.length === 0) {
        return <p>Ничего не найдено</p>;
    }



    return (
        <div className='artist-list'>
            {artists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
            ))}
        </div>
    );
}