import {createBrowserRouter} from 'react-router-dom';
import { MainLayout} from '@/app';
import {HomePage, FavoritiesPage, ChartsPage,ArtistPage}  from '@/pages';


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
