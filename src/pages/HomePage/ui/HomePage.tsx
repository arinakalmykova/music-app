import { SearchForm } from '@/features';
import { ArtistList} from '@/widgets'
import { useArtistSearch}  from '@/features';
import '@/app/styles/HomePage.css';

export function HomePage() {
    const {isLoading, error, results, search} = useArtistSearch();

  return (
    <div className='search'>
        <SearchForm  onSearch={search} isLoading={isLoading}/>
        <ArtistList artists={results} isLoading={isLoading} error={error} />
    </div>
  );
}