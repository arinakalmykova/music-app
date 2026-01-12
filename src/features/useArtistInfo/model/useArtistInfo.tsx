import { useAppDispatch, useAppSelector } from '@/app';
import {fetchArtist} from '@/app';

export function useArtistInfo(artistName: string) {
    const dispatch = useAppDispatch();
   
   const artistInfo = useAppSelector(state => state.artist.artist);
   const isLoading = useAppSelector(state => state.artist.isLoading);
   const error = useAppSelector(state => state.artist.error);

    const loadArtistInfo = async () => {
       dispatch(fetchArtist(artistName));
    };

    return { artistInfo, isLoading, error, loadArtistInfo };
}

