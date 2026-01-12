import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {ArtistInfo} from '@/entities';
import { getFullArtistInfo } from '@/entities';

interface ArtistState {
    artist:ArtistInfo | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: ArtistState = {
    artist: null,
    isLoading: false,
    error: null,
}

export const fetchArtist = createAsyncThunk('artist/fetchArtist',
    async (artistName:string) => {
        const data = await getFullArtistInfo(artistName);
        if (!data) throw new Error('Артист не найден');
        return data;
    }
)

export const artistSlice = createSlice({
    name:'artist',
    initialState,
    reducers:{
        clearArtist(state) {
            state.artist = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchArtist.pending, (state) => {
            state.isLoading = true;
            state.error = null;

        })
        .addCase(fetchArtist.fulfilled, (state,action) => {
            state.isLoading = false;
            state.artist = action.payload;
        })
        .addCase(fetchArtist.rejected, (state,action) => {
            state.isLoading = false;
            state.error = action.error.message || 'Ошибка загрузки';
        })
    }
});

export const {clearArtist} = artistSlice.actions;
export default artistSlice.reducer;
