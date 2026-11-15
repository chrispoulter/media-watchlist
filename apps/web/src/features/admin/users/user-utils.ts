import type { AdminUser } from '../admin-queries';

export function isBanned(user: AdminUser) {
    if (!user.banned) {
        return false;
    }

    return !user.banExpires || new Date(user.banExpires) > new Date();
}

export const roleOptions = [
    { value: 'user', label: 'User' },
    { value: 'admin', label: 'Administrator' },
] as const;

const DAY_IN_SECONDS = 60 * 60 * 24;

export const banDurations = [
    { value: 'permanent', label: 'Permanent', seconds: undefined },
    { value: '1d', label: '1 day', seconds: DAY_IN_SECONDS },
    { value: '7d', label: '7 days', seconds: 7 * DAY_IN_SECONDS },
    { value: '30d', label: '30 days', seconds: 30 * DAY_IN_SECONDS },
] as const;
