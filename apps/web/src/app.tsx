import { Routes, Route } from 'react-router';
import { RootLayout } from '@/components/root-layout';
import { NotFoundPage } from '@/pages/not-found-page';
import { accountRoutes } from '@/features/account/account-routes';
import { profileRoutes } from '@/features/profile/profile-routes';
import { searchRoutes } from '@/features/search/search-routes';
import { watchlistRoutes } from '@/features/watchlist/watchlist-routes';

export default function App() {
    return (
        <Routes>
            <Route element={<RootLayout />}>
                {accountRoutes}
                {profileRoutes}
                {searchRoutes}
                {watchlistRoutes}
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}
