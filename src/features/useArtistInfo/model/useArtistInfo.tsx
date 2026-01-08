import type { AppDispatch, RootState } from '@/app/store/store';
import  { useDispatch,useSelector} from 'react-redux';
import {fetchArtist} from '@/app/store/slices/artistSlice';

export default function useArtistInfo(artistName: string) {
    const dispatch = useDispatch<AppDispatch>();
    const artistInfo = useSelector<RootState>(state => state.artist.artist );
    const isLoading =useSelector<RootState>(state => state.artist.isLoading );
    const error =useSelector<RootState>(state => state.artist.error );

    const loadArtistInfo = async () => {
       dispatch(fetchArtist(artistName));
    };

    return { artistInfo, isLoading, error, loadArtistInfo };
}

