import type {Artist} from '../../../entities/artist/model/types';

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
        <ul>
            {artists.map((artist) => (
                <li key={artist.id}>
                    <h2>{artist.name}</h2>
                    <img src={artist.image} alt={artist.name} />
                    <p>Слушателей: {artist.listeners}</p>
                </li>       
            ))}
        </ul>
    );
}