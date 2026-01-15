import { configureStore } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';
import favoritesReducer from './slices/favoritesSlice';
import chartReducer from './slices/chartsSlice';
import { useSelector, useDispatch } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import {artistApi, trackApi,albumApi} from '@/entities';


const saveToLocalStorage: Middleware = store => next => action => {
  const result = next(action);
  const state = store.getState();
  localStorage.setItem('likedTracks', JSON.stringify(state.favorites.likedMusic));
  return result;
};

const persistedFavorites = localStorage.getItem('likedTracks');
const initialFavorites = persistedFavorites ? JSON.parse(persistedFavorites) : [];

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    charts: chartReducer,
    // Подключаем RTK Query reducers по их reducerPath
    [albumApi.reducerPath]: albumApi.reducer,
    [artistApi.reducerPath]: artistApi.reducer,
    [trackApi.reducerPath]: trackApi.reducer,
  },
  preloadedState: {
    favorites: {
      likedMusic: initialFavorites
    }
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(artistApi.middleware)
      .concat(trackApi.middleware)
      .concat(albumApi.middleware)
      .concat(saveToLocalStorage)
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
