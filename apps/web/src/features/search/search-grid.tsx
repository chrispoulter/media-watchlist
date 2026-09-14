import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
    Empty,
    EmptyHeader,
    EmptyTitle,
    EmptyDescription,
} from '@/components/ui/empty';
import { MediaCardSkeleton } from '@/components/media-card-skeleton';
import { useSearch } from './search-queries';
import { SearchBar } from './search-bar';
import { SearchCard } from './search-card';

export function SearchGrid() {
    const [searchQuery, setSearchQuery] = useState('');
    const searchEnabled = searchQuery.trim().length >= 2;

    const {
        data: results,
        isLoading,
        error,
    } = useSearch(searchQuery, searchEnabled);

    return (
        <>
            <SearchBar onSearch={setSearchQuery} />

            {searchEnabled ? (
                isLoading ? (
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-4">
                        <MediaCardSkeleton />
                        <MediaCardSkeleton />
                        <MediaCardSkeleton />
                        <MediaCardSkeleton />
                    </div>
                ) : error ? (
                    <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            Failed to load search results. Please try again.
                        </AlertDescription>
                    </Alert>
                ) : !results?.length ? (
                    <Empty className="border border-dashed">
                        <EmptyHeader>
                            <EmptyTitle>No results found</EmptyTitle>
                            <EmptyDescription>
                                Try a different search term
                            </EmptyDescription>
                        </EmptyHeader>
                    </Empty>
                ) : (
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-4">
                        {results.map((result) => (
                            <SearchCard
                                key={`${result.mediaType}-${result.providerId}`}
                                result={result}
                            />
                        ))}
                    </div>
                )
            ) : (
                <Empty className="border border-dashed">
                    <EmptyHeader>
                        <EmptyTitle>Start typing to search</EmptyTitle>
                        <EmptyDescription>
                            Search for movies and TV shows to add them here
                        </EmptyDescription>
                    </EmptyHeader>
                </Empty>
            )}
        </>
    );
}
