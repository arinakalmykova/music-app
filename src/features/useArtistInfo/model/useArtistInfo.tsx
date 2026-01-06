import {useState} from 'react';
import type { ArtistInfo } from '@/entities/artist/model/types';
import { getFullArtistInfo } from '@/entities/artist/api/artistApi';

export default function useArtistInfo(artistName: string) {
    const [artistInfo, setArtistInfo] = useState<ArtistInfo | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const loadArtistInfo = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const info = await getFullArtistInfo(artistName);
            setArtistInfo(info);
        } catch (err) {
            setError('Failed to load artist info');
        } finally {
            setIsLoading(false);
        }
    };

    return { artistInfo, isLoading, error, loadArtistInfo };
}

