import { useState } from 'react';
import type {Artist } from '../../../entities/artist/model/types';
import { searchArtists } from '../../../entities/artist/api/artistApi';


export default function useArtistSearch() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<Artist[]>([]);

    const search = async (query: string) => { 
        if (query.trim() === '') {
            setResults([]);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const artists = await searchArtists(query);
            setResults(artists);
        } catch (err) {
            setError('Ошибка при поиске артистов');
        } finally {
            setIsLoading(false);
        }
    }

    return {isLoading, error, results, search};
}