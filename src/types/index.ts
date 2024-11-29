export interface Article {
  id: string;
  title: string;
  author: string;
  status: 'pending' | 'reviewed' | 'unreviewed';
  quality?: number;
  content?: string;
  date?: string;
}

export interface Metrics {
  authors: number;
  articles: number;
  reviewed: number;
  pending: number;
  unreviewed: number;
}

export interface EntityMetrics {
  people: number;
  places: number;
  dates: number;
  organizations: number;
}

export interface AdjectiveMetrics {
  total: number;
  max: number;
}