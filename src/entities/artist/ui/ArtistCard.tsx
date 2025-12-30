import type { Artist } from '../model/types';
import '../../../app/styles/ArtistCard.css';
import { NavLink } from 'react-router';

export function ArtistCard({ artist }: { artist: Artist }) {
    return (
        <NavLink to={`/artist/${artist.name}`} className="artist-card">
            <h2>{artist.name}</h2>
            <img src={artist.image} alt={artist.name} />
            <p>Слушателей: {artist.listeners}</p>
        </NavLink>
    );
}