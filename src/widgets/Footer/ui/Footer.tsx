import '@/app/styles/Footer.css';
import { NavLink } from 'react-router-dom';
import { Github, Twitter, Instagram, Facebook } from 'lucide-react';

export function Footer(){  
    const currentYear = new Date().getFullYear();
    return (
        <footer className="footer">
            <div className="footer_content">
                <div className="footer_container">
                <div className="company section">
                    <h3 >Компания</h3>
                    <ul className="list">
                        <NavLink to="/">О нас</NavLink>
                        <NavLink to="/">Проекты</NavLink>
                    </ul>
                </div>
                <div className="community section">
                    <h3>Сообщество</h3>
                    <ul className="list">
                        <NavLink to="/">Для артистов</NavLink>
                        <NavLink to="/">Разработчикам</NavLink>
                        <NavLink to="/">Реклама</NavLink>
                    </ul>
                </div>
                <div className="useful_links section">
                    <h3 >Полезные ссылки</h3>
                    <ul className="list">
                        <NavLink to="/">Поддержка</NavLink>
                        <NavLink to="/">Веб-плеер</NavLink>
                        <NavLink to="/">Мобильное приложение</NavLink>
                    </ul>
                </div>
                <div className="subscribe section">
                    <h3>Подпишитесь на нас</h3>
                    <div className="list-icon">
                        <NavLink to="/"><Instagram className="" /></NavLink>
                        <NavLink to="/"> <Twitter className="" /></NavLink>
                        <NavLink to="/"> <Facebook className="" /></NavLink>
                        <NavLink to="/"> <Github className="" /></NavLink>
                    </div>
                </div>
                </div>
                <div className="footer_bottom_bar">
                    <div className="bottom_list">
                        <NavLink to="/">Закон</NavLink>
                        <NavLink to="/">Центр политики</NavLink>
                        <NavLink to="/">Политика конфиденциальности</NavLink>
                        <NavLink to="/">Cookies</NavLink>
                </div>
                <div className="footer_year">
                    © {currentYear} Music Stream
                </div>
                </div>
            </div>
        </footer>
    );
}
