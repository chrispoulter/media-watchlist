import { useCallback, useState } from 'react';
import { Metadata } from '@/components/metadata';
import { Pagination } from '@/components/pagination';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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

                <Pagination
                    page={page}
                    pageSize={PAGE_SIZE}
                    total={total}
                    onPageChange={setPage}
                    summary={`${total} ${total === 1 ? 'user' : 'users'}`}
                />
            </div>
        </>
    );
}
