import { Header } from '@/widgets/Header/ui/Header.tsx';
import { Footer } from '@/widgets/Footer/ui/Footer.tsx';
import {Outlet} from 'react-router-dom';

export function MainLayout() {
    return (
        <>
        <Header/>
        <main>
            <Outlet/>
        </main>
        <Footer/>
        </>
    )
}