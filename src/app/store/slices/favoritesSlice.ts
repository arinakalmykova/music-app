import { createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {Track} from '@/entities';

interface favoriteState {
    likedMusic:Track[];
}

const initialState: favoriteState = {
    likedMusic: JSON.parse(localStorage.getItem("likedTracks") || '[]'),
}

export const favoritesSlice = createSlice({
    name:'favorites',
    initialState,
    reducers:{
        toggleLike(state,action:PayloadAction<Track>) {
            const track = action.payload;
            const exist = state.likedMusic.find( t =>  t.id === track.id);
            if (exist) {
                state.likedMusic =state.likedMusic.filter( t =>  t.id != track.id);
            } else {
                state.likedMusic.push(track);
            }
        }
    },
});

export const {toggleLike} = favoritesSlice.actions;
export default favoritesSlice.reducer;
