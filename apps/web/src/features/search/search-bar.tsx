import { memo, useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export function SearchBarComponent({ onSearch }: SearchBarProps) {
    const [query, setQuery] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(query);
        }, 300);
        return () => clearTimeout(timer);
    }, [query, onSearch]);

    return (
        <InputGroup>
            <InputGroupInput
                type="search"
                placeholder="Search movies and TV shows..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <InputGroupAddon>
                <Search />
            </InputGroupAddon>
        </InputGroup>
    );
}

export const SearchBar = memo(SearchBarComponent);
