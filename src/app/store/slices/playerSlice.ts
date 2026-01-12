import { createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {Track} from '@/entities';

interface PlayerState {
    currentTrack:Track | null;
    isPlaying:boolean;
}

const initialState: PlayerState = {
    currentTrack:null,
    isPlaying:false,
}

export const playerSlice = createSlice({
    name:'player',
    initialState,
    reducers:{
        playTrack(state,action:PayloadAction<Track>) {
            state.currentTrack = action.payload;
            state.isPlaying = true;
        },
        togglePlay(state) {
            state.isPlaying = !state.isPlaying;
        },
        pause(state) {
            state.isPlaying = false;
        }
    },
});

export const {playTrack, pause, togglePlay} = playerSlice.actions;
export default playerSlice.reducer;
