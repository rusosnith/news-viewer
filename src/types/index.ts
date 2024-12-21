
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
  // Add additional fields from output data
  adjectives?: any;
  entities?: {entities_freq: [any,any][], entities_list:  { text: string; type: string; start_char: number; end_char: number;sentiment: number }[]};
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
  Lugar: number;
  Persona: number;
  Organización: number;
  Misceláneo: number;
  Fecha:number;
}

export interface AdjectiveMetrics {
  total: number;
  max: number;
}