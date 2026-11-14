import { memo, useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group';

const MIN_SEARCH_LENGTH = 2;

interface SearchBarProps {
    onSearch: (query: string) => void;
}

function SearchBarComponent({ onSearch }: SearchBarProps) {
    const [query, setQuery] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            const trimmed = query.trim();
            onSearch(trimmed.length >= MIN_SEARCH_LENGTH ? trimmed : '');
        }, 300);
        return () => clearTimeout(timer);
    }, [query, onSearch]);

    return (
        <InputGroup>
            <InputGroupInput
                type="search"
                aria-label="Search movies and TV shows"
                placeholder="Search movies and TV shows..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <InputGroupAddon>
                <Search aria-hidden="true" />
            </InputGroupAddon>
        </InputGroup>
    );
}

export const SearchBar = memo(SearchBarComponent);
