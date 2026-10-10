import { Routes, Route } from 'react-router';
import { RootLayout } from '@/components/layout/root-layout';
import { NotFoundPage } from '@/pages/not-found-page';
import { PrivacyPage } from '@/pages/privacy-page';
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
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}
