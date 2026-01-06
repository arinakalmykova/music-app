import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './slices/favoritesSlice';
import artistReducer from './slices/artistSlice';
import playerReducer from './slices/playerSlice';

export const store = configureStore({
        reducer: {
            favorites: favoritesReducer,
            artist: artistReducer,
            player: playerReducer,
        }
    }
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
