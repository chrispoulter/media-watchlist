import { z } from 'zod';

export interface ErrorResponse {
    error: string;
    details?: object[];
}

export const mediaTypeSchema = z.enum(['movie', 'tv-show']);

export type MediaType = z.infer<typeof mediaTypeSchema>;

export type SearchResponse = {
    providerId: string;
    mediaType: MediaType;
    title: string;
    posterUrl?: string;
    overview?: string;
    releaseDate?: string;
    watchlistItemId?: number;
}[];

export type WatchlistResponse = {
    id: number;
    providerId: string;
    mediaType: MediaType;
    title: string;
    posterUrl?: string;
    overview?: string;
    releaseDate?: string;
    addedAt: string;
}[];

export const addWatchlistItemSchema = z.object({
    providerId: z.string().min(1),
    mediaType: mediaTypeSchema,
    title: z.string().min(1),
    posterUrl: z.url().optional(),
    overview: z.string().optional(),
    releaseDate: z.string().optional(),
});

export type AddWatchlistItemRequest = z.infer<typeof addWatchlistItemSchema>;

export interface AddWatchlistItemResponse {
    id: number;
    providerId: string;
    mediaType: MediaType;
    title: string;
    posterUrl?: string;
    overview?: string;
    releaseDate?: string;
    addedAt: string;
}
