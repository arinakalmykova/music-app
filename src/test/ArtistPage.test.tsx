import {render, screen} from '@testing-library/react';
import { ArtistPage } from '@/pages';
import { vi } from 'vitest';
import { MemoryRouter,Route,Routes } from 'react-router-dom';

vi.mock('@/entities', async () => {
    const actual = await vi.importActual<any>('@/entities')
    return {
        ...actual,
    useGetArtistBaseInfoQuery: () => ({
      data: {
        name: 'Macan',
        listeners: '100000',
        image: '',
        tags: ['rap'],
        topTracks: [],
        topAlbums: [],
        similarArtists: [],
      },
      isLoading: false,
      error: null,
    }),
    useGetArtistTopTracksQuery: () => ({ data: [], isLoading: false }),
    useGetArtistTopAlbumsQuery: () => ({ data: [], isLoading: false }),
    }
});

describe('ArtistPage', () => {
    it('renders artist name', () => {
        render(
            <MemoryRouter initialEntries={['/artist/Macan']}>
                <Routes>
                    <Route path="/artist/:name" element={<ArtistPage />} />
                </Routes>
            </MemoryRouter>); 
        expect(screen.getByText('Macan')).toBeInTheDocument();
    });
})