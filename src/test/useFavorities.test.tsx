import {renderHook,act } from '@testing-library/react';
import {useFavorities} from '@/features';
import {Provider} from 'react-redux';
import {store} from '@/app';

const track = {
    id: 1,
    title: 'Track 1',
    artist: { id: '1', name: 'Artist 1', image: '', listeners: 0 },
    previewUrl: 'preview.mp3',
    coverImage: 'cover.jpg',
};

describe('useFavorities', () => {
    it('should add and removes track from favorites', () => {
        const { result } = renderHook(() => useFavorities(), 
        { wrapper: ({ children }) => <Provider store={store}>{children}</Provider> });
        act(() => result.current.onToggleLike(track));
        expect(result.current.isLiked(track)).toBe(true);
        act(() => result.current.onToggleLike(track));
        expect(result.current.isLiked(track)).toBe(false);
    });
})