import { z } from 'zod';

export const MEDIA_TYPES = ['movie', 'tv-show'] as const;
export const mediaTypeSchema = z.enum(MEDIA_TYPES);
export type MediaType = z.infer<typeof mediaTypeSchema>;

export const watchlistItemSchema = z.object({
  id: z.number(),
  providerId: z.string(),
  mediaType: mediaTypeSchema,
  title: z.string(),
  posterUrl: z.string().optional(),
  overview: z.string().optional(),
  releaseDate: z.string().optional(),
  addedAt: z.string(),
});
export type WatchlistItem = z.infer<typeof watchlistItemSchema>;

export const searchResultSchema = z.object({
  providerId: z.string(),
  mediaType: mediaTypeSchema,
  title: z.string(),
  posterUrl: z.string().optional(),
  overview: z.string().optional(),
  releaseDate: z.string().optional(),
  watchlistItemId: z.number().optional(),
});
export type SearchResult = z.infer<typeof searchResultSchema>;

export const addWatchlistItemSchema = z.object({
  providerId: z.string().min(1),
  mediaType: mediaTypeSchema,
  title: z.string().min(1),
  posterUrl: z.url().optional(),
  overview: z.string().optional(),
  releaseDate: z.string().optional(),
});
export type AddWatchlistItemRequest = z.infer<typeof addWatchlistItemSchema>;

export const apiErrorResponseSchema = z.object({
  error: z.string(),
  details: z.array(z.unknown()).optional(),
});
export type ApiErrorResponse = z.infer<typeof apiErrorResponseSchema>;
