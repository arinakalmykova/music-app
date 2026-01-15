import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Track, Artist } from '@/entities';
import { getGlobalTopTracks } from '@/entities';

interface ChartState {
  topTracks: Track[];
  topArtists: Artist[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ChartState = {
  topTracks: [],
  topArtists: [],
  isLoading: false,
  error: null,
};

export const fetchGlobalCharts = createAsyncThunk(
  'charts/fetchGlobalCharts',
  async () => {
    const tracks = await getGlobalTopTracks();
    const artists: Artist[] = tracks.map(t => t.artist);
    return { tracks, artists };
  }
);


export const chartSlice = createSlice({
  name: 'charts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGlobalCharts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGlobalCharts.fulfilled, (state, action) => {
        state.topTracks = action.payload.tracks;
        state.topArtists = action.payload.artists;
        state.isLoading = false;
      })
      .addCase(fetchGlobalCharts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки';
      });
  },
});

export default chartSlice.reducer;
