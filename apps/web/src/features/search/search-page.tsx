import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
    Empty,
    EmptyHeader,
    EmptyTitle,
    EmptyDescription,
} from '@/components/ui/empty';
import { MediaCardSkeleton } from '@/components/media-card-skeleton';
import { Metadata } from '@/components/metadata';
import { useSearch } from './search-queries';
import { SearchBar } from './search-bar';
import { SearchGrid } from './search-grid';

export function SearchPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const searchEnabled = searchQuery.trim().length >= 2;

    const {
        data: results,
        isLoading,
        error,
    } = useSearch(searchQuery, searchEnabled);

    return (
        <>
            <Metadata title="Search" />
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Search
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Find movies and TV shows to add to your watchlist
                    </p>
                </div>

                <SearchBar onSearch={setSearchQuery} />

                {searchEnabled ? (
                    isLoading ? (
                        <div
                            aria-busy="true"
                            className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-4"
                        >
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
                        <SearchGrid results={results} />
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
            </div>
        </>
    );
}
