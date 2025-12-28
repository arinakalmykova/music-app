import {SearchForm} from '../../../features/artistSearch/ui/SearchForm';
import useArtistSearch from '../../../features/artistSearch/model/useArtistSearch';
import { ArtistList } from '../../../widgets/ArtistList/ui/ArtistList';
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