import React, {useState} from "react";
import '../../../app/styles/SearchForm.css';

interface SearchFormProps {
    onSearch?: (query: string) => void;
    isLoading?: boolean;
}   

export function SearchForm({onSearch,isLoading}: SearchFormProps) {

    const [query, setQuery] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch?.(query);
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <input type="text" placeholder="Введите имя артиста или трека..." value={query} onChange={(e) => setQuery(e.target.value)} /> 
            <button className="btn-search" type="submit" disabled={isLoading}>Поиск</button>
        </form>
    );
}