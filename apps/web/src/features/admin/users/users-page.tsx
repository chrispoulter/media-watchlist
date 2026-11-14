import { useCallback, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Metadata } from '@/components/metadata';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
} from '@/components/ui/empty';
import { useAdminUsers } from '../admin-queries';
import { CreateUserDialog } from './create-user-dialog';
import { UsersSearchBar } from './users-search-bar';
import { UsersTable } from './users-table';

const PAGE_SIZE = 20;
const MIN_SEARCH_LENGTH = 2;

export function UsersPage() {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const handleSearch = useCallback((query: string) => {
        const trimmed = query.trim();
        setSearch(trimmed.length >= MIN_SEARCH_LENGTH ? trimmed : '');
        setPage(1);
    }, []);

    const { data, isLoading, isPlaceholderData, error } = useAdminUsers({
        search,
        limit: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE,
    });

    const total = data?.total ?? 0;
    const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

    return (
        <>
            <Metadata title="Users" />
            <div className="space-y-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <UsersSearchBar onSearch={handleSearch} />
                    <CreateUserDialog />
                </div>

                {error ? (
                    <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error.message}</AlertDescription>
                    </Alert>
                ) : isLoading ? (
                    <div aria-busy="true" className="space-y-2">
                        {Array.from({ length: 5 }, (_, i) => (
                            <Skeleton
                                key={i}
                                aria-hidden="true"
                                className="h-10 w-full"
                            />
                        ))}
                    </div>
                ) : !data?.users.length ? (
                    <Empty className="border border-dashed">
                        <EmptyHeader>
                            <EmptyTitle>No users found</EmptyTitle>
                            <EmptyDescription>
                                {search
                                    ? 'Try a different search term'
                                    : 'There are no user accounts yet'}
                            </EmptyDescription>
                        </EmptyHeader>
                    </Empty>
                ) : (
                    <div
                        aria-busy={isPlaceholderData}
                        className={
                            isPlaceholderData ? 'opacity-60 transition' : ''
                        }
                    >
                        <UsersTable users={data.users} />
                    </div>
                )}

                {total > 0 && (
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>
                            {total} {total === 1 ? 'user' : 'users'}
                        </span>
                        <div className="flex items-center gap-2">
                            <span>
                                Page {page} of {pageCount}
                            </span>
                            <Button
                                variant="outline"
                                size="icon-sm"
                                aria-label="Previous page"
                                onClick={() => setPage(page - 1)}
                                disabled={page <= 1}
                            >
                                <ChevronLeft aria-hidden="true" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon-sm"
                                aria-label="Next page"
                                onClick={() => setPage(page + 1)}
                                disabled={page >= pageCount}
                            >
                                <ChevronRight aria-hidden="true" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
