import { Header } from '@/widgets';
import { Footer } from '@/widgets';
import {Outlet} from 'react-router-dom';
import '@/app/styles/MainLayout.css';
export function MainLayout() {
    return (
        <>
        <div className='layout'>
            <Header/>
            <main className ='content'>
                <Outlet/>
            </main>
            <Footer/>
        </div>
        </>
    )
}