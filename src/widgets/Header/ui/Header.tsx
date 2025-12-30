import '../../../app/styles/Header.css';
import { NavLink } from 'react-router-dom';

export function Header(){
    return (
        <header>
            <div className='logo'><NavLink to="/"><img src="../../../../../public/logo.svg" alt="logo" /></NavLink></div>
            <nav className='nav-links'>
                <NavLink to="/">Главная</NavLink>
                <NavLink to="/favorites">Любимое</NavLink>
                <NavLink to="/charts">Чарты</NavLink>
            </nav>
        </header>
    );
}