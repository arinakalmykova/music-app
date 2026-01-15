import { useState } from 'react';
import { useSearchArtistQuery } from '@/entities';

export function useArtistSearch() {
  const [query, setQuery] = useState(''); 

  const { data, isLoading, error } = useSearchArtistQuery(query, {
    skip: query.trim() === '', 
  });

  const search = (q: string) => setQuery(q);

  return {
    results: data || [],
    isLoading,
    error: error ? 'Ошибка при поиске артистов' : null,
    search,
  };
}
