import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './slices/favoritesSlice';
import artistReducer from './slices/artistSlice';
import playerReducer from './slices/playerSlice';
import chartReducer from './slices/chartsSlice';
import {  useSelector,useDispatch } from 'react-redux';
import type { TypedUseSelectorHook} from 'react-redux';


export const store = configureStore({
        reducer: {
            favorites: favoritesReducer,
            artist: artistReducer,
            player: playerReducer,
            charts:chartReducer
        }
    }
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

