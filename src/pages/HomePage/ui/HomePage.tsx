import { SearchForm, ArtistList } from '../../../app/router/router';
import useArtistSearch from '../../../features/artistSearch/model/useArtistSearch';
import '../../../app/styles/HomePage.css';

export function HomePage() {
    const {isLoading, error, results, search} = useArtistSearch();

  return (
    <div className='search'>
        <SearchForm  onSearch={search} isLoading={isLoading}/>
        <ArtistList artists={results} isLoading={isLoading} error={error} />
    </div>
  );
}