import { memo, useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group';

interface UsersSearchBarProps {
    onSearch: (query: string) => void;
}

function UsersSearchBarComponent({ onSearch }: UsersSearchBarProps) {
    const [query, setQuery] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(query);
        }, 300);
        return () => clearTimeout(timer);
    }, [query, onSearch]);

    return (
        <InputGroup className="sm:max-w-xs">
            <InputGroupInput
                type="search"
                aria-label="Search users by email"
                placeholder="Search by email..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <InputGroupAddon>
                <Search aria-hidden="true" />
            </InputGroupAddon>
        </InputGroup>
    );
}

export const UsersSearchBar = memo(UsersSearchBarComponent);
