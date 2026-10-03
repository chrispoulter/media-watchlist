import { Navigate, Outlet, useLocation } from 'react-router';
import { Spinner } from '@/components/ui/spinner';
import { authClient, isAdmin } from '@/lib/auth-client';
import { ErrorPage } from '@/pages/error-page';

export function RequireAdmin() {
    const {
        data: session,
        isPending,
        error,
        refetch,
    } = authClient.useSession();
    const location = useLocation();

    if (isPending) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <Spinner className="h-6 w-6 text-muted-foreground" />
            </div>
        );
    }

    if (!session && error && error.status !== 401) {
        return <ErrorPage error={error} resetErrorBoundary={() => refetch()} />;
    }

    if (!session) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!isAdmin(session.user)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
