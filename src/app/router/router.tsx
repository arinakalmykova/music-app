import {createBrowserRouter} from 'react-router-dom';
import { MainLayout} from '@/app/layouts/MainLayout.tsx';
import {HomePage, FavoritiesPage, ChartsPage,ArtistPage}  from '@/app/index.ts';


export const router = createBrowserRouter([
    {
        element:<MainLayout/>,
        children: [
            {
                path:'/',
                element:<HomePage/>
            },
            {
                path:'/favorites',
                element:<FavoritiesPage />
            },
            {
                path:'/charts',
                element:<ChartsPage />
            },
            {
                path:'/artist/:name',
                element:<ArtistPage />
            }
        ]
    }
]);
