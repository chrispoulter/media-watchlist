import type { SearchResponse } from '@media-watchlist/shared';
import { SearchCard } from './search-card';

interface SearchGridProps {
    results: SearchResponse;
}

export function SearchGrid({ results }: SearchGridProps) {
    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-4">
            {results.map((result) => (
                <SearchCard
                    key={`${result.mediaType}-${result.providerId}`}
                    result={result}
                />
            ))}
        </div>
    );
}
