export type MediaType = 'movie' | 'tv';

export interface WatchlistItem {
  id: number;
  providerId: string;
  mediaType: MediaType;
  title: string;
  posterUrl?: string;
  overview?: string;
  releaseDate?: string;
  addedAt: string;
}

export interface SearchResult {
  providerId: string;
  mediaType: MediaType;
  title: string;
  posterUrl?: string;
  overview?: string;
  releaseDate?: string;
  watchlistItemId?: number;
}
