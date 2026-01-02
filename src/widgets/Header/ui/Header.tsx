import '../../../app/styles/Header.css';
import { NavLink } from 'react-router-dom';
import Logo from '../../../widgets/Logo/ui/Logo';

export function Header(){
    return (
        <header className='header'>
            <div className='header-container'>
                <div className='header-content'>
                    <div className='logo'>
                        <NavLink to="/">
                            <div className='logo-image'> 
                                <Logo />
                                <span>Music Flow</span>
                            </div>
                        </NavLink>
                    </div>
                    <nav className='nav-links'>
                        <NavLink to="/">Главная</NavLink>
                        <NavLink to="/favorites">Любимое</NavLink>
                        <NavLink to="/charts">Чарты</NavLink>
                    </nav>
                </div>
            </div>
        </header>
    );
}