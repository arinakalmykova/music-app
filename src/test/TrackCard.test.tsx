import {render, screen} from '@testing-library/react';
import { TrackCard } from '@/entities';
import { describe, it, expect, vi } from 'vitest';
import { current } from '@reduxjs/toolkit';

vi.mock('@/features', () => ({
    useFavorities: () => ({
        onToggleLike: vi.fn(),
        isLiked: () => false,
    }),
    usePlayerContext: () => ({
        currentTrack: null,
        isPlaying: false,
        progress: 0,
        duration: 0,
        playTrack: vi.fn(),
        togglePlay: vi.fn(),
        playNext: vi.fn(),
        playPrev: vi.fn(),
    }),
}))

const track = {
    id: 1,
    title: 'Track 1',
    artist: { id: '1', name: 'Artist 1', image: '', listeners: 0 },
    previewUrl: 'preview.mp3',
    coverImage: 'cover.jpg',
};

describe('TrackCard', () => {
    it('renders correctly', () => {
        render(<TrackCard track={track} />);
        expect(screen.getByText('Track 1')).toBeInTheDocument();
        expect(screen.getByText('Artist 1')).toBeInTheDocument();
    });
});