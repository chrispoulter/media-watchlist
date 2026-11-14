import type { ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PaginationProps {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
    summary?: ReactNode;
    className?: string;
}

export function Pagination({
    page,
    pageSize,
    total,
    onPageChange,
    summary,
    className,
}: PaginationProps) {
    if (total <= 0) {
        return null;
    }

    const pageCount = Math.max(1, Math.ceil(total / pageSize));

    return (
        <nav
            aria-label="Pagination"
            className={cn(
                'flex items-center justify-between gap-2 text-sm text-muted-foreground',
                className,
            )}
        >
            <span>{summary}</span>
            <div className="flex items-center gap-2">
                <span>
                    Page {page} of {pageCount}
                </span>
                <Button
                    variant="outline"
                    size="icon-sm"
                    aria-label="Previous page"
                    onClick={() => onPageChange(page - 1)}
                    disabled={page <= 1}
                >
                    <ChevronLeft aria-hidden="true" />
                </Button>
                <Button
                    variant="outline"
                    size="icon-sm"
                    aria-label="Next page"
                    onClick={() => onPageChange(page + 1)}
                    disabled={page >= pageCount}
                >
                    <ChevronRight aria-hidden="true" />
                </Button>
            </div>
        </nav>
    );
}
