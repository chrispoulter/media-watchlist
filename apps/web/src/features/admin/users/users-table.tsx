import { Link } from 'react-router';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import type { AdminUser } from '../admin-queries';
import { RoleBadge, StatusBadge } from './user-badges';
import { UserActionsMenu } from './user-actions/user-actions-menu';

interface UsersTableProps {
    users: AdminUser[];
}

export function UsersTable({ users }: UsersTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="hidden md:table-cell">Role</TableHead>
                    <TableHead className="hidden md:table-cell">
                        Status
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                        Created
                    </TableHead>
                    <TableHead className="w-12">
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium">
                            <Link
                                to={`/admin/users/${user.id}`}
                                className="hover:underline"
                            >
                                {user.name}
                            </Link>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                            {user.email}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                            <RoleBadge user={user} />
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                            <StatusBadge user={user} />
                        </TableCell>
                        <TableCell className="hidden text-muted-foreground lg:table-cell">
                            {new Date(user.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                            <UserActionsMenu
                                user={user}
                                showViewDetails
                                trigger={
                                    <Button
                                        variant="ghost"
                                        size="icon-sm"
                                        aria-label={`Actions for ${user.name}`}
                                    >
                                        <MoreHorizontal aria-hidden="true" />
                                    </Button>
                                }
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
