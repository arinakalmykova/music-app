import { useState, useEffect} from 'react';
import { searchArtists } from '../../../entities/artist/api/artistApi';
import type { Artist } from '../../../entities/artist/model/types';

export function HomePage() {
    const [artists, setArtists] = useState<Artist[]>([]);

    useEffect(() => {
    async function fetchArtists() {
      const results = await searchArtists('Три дня дождя');
      setArtists(results);
    };
    fetchArtists();
        }, []);

  return (
    <div>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>
            <h2>{artist.name}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}