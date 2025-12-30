import './styles/App.css'
import {HomePage, FavoritiesPage, ChartsPage,ArtistPage}  from './router/router.tsx';
import { Header } from '../widgets/Header/ui/Header.tsx';
import { Fragment } from 'react/jsx-runtime';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Fragment>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritiesPage />} />
          <Route path="/charts" element={<ChartsPage />} />
          <Route path="/artist/:name" element={<ArtistPage />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  )
}

export default App
