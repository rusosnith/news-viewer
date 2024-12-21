export interface Article {
  id: string;
  hora: string;
  link_noticia: string;
  link_foto: string;
  autor: string;
  categorias: string[];
  cuerpo: string;
  volanta: string;
  fecha: string;
  fecha_resumen: string;
  etiquetas: string[];
  titulo: string;
  resumen: string;
  medio: string;
  adjectives?: any;
  entities?: any;
  metrics?: any;
  sentiment?: any;
  sources?: any;
  status?: string;
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